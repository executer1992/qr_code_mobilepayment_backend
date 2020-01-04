import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from './Helper';
import db from '../db';
import User from '../models/User';
import {createUser, getUserByEmail} from '../repository/UserRepository';

const UserController = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const { userData} = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      created_date: moment(new Date()),
      modified_date: moment(new Date())
    };
    const user = new User(userData)

    try {
      const { rows } = createUser(user);
      const expires_in = 24 * 60 * 60;
      const access_token = Helper.generateToken(rows[0].id, expires_in);
      return res.status(201).send( { access_token, expires_in });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },
  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const expires_in = 24 * 60 * 60;
      const access_token = Helper.generateToken(rows[0].id, expires_in);
      return res.status(200).send({access_token, expires_in});
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default UserController;