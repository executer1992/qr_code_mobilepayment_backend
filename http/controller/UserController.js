import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db/config';
import Helper from '../../helpers/Helper';
import User from '../models/User';
import {getUserByEmail, createUser} from '../repository/UserRepository';

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

    const user = new User(req.body.name,req.body.email,req.body.password)
   
    try {
      const { rows } = await createUser(user);
      const expires_in = 24 * 60 * 60;
      const access_token = Helper.generateToken(user.id, expires_in);
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

    try {
      const { rows } = await getUserByKey('email', req.body.email);

      if (!rows[0]) {
        return res.status(404).send({'message': 'User not found'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).send({ 'message': 'Password not valid' });
      }
      const expires_in = 24 * 60 * 60;
      const token = Helper.generateToken(rows[0].id, expires_in);
      return res.status(200).send({token, expires_in});
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  
}

export default UserController;