import moment from 'moment';
import Helper from '../../../helpers/Helper';
import User from '../models/User';
import * as UserRepository from '../repository/UserRepository';

const UserService = {
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: 'Please enter a valid email address' });
    }

    const user = new User(req.body);

    try {
      const { rows } = await UserRepository.createUser(user);
      const expires_in = 24 * 60 * 60;
      const access_token = Helper.generateToken(user.userId, expires_in);
      return res.status(201).send({ access_token, expires_in });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res
          .status(400)
          .send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(error);
    }
  },

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: 'Please enter a valid email address' });
    }

    try {
      const { rows } = await UserRepository.getUserByKey('email', [
        req.body.email
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'User not found' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).send();
      }
      const expires_in = 24 * 60 * 60;
      const access_token = Helper.generateToken(rows[0].id, expires_in);
      const { user } = rows[0];
      return res.status(200).send({user, access_token, expires_in });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async edit(req, res) {
    if (!req.body.user) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    const password = Helper.hashPassword(req.body.password);
    const edit_date = moment(new Date());
    try {
      const { rows } = await UserRepository.changePassword(
        [password, edit_date],
        req.user.id
      );
      if (!rows[0]) {
        return res.status(404).send({ message: 'User not found' });
      }
      const expires_in = 24 * 60 * 60;
      const access_token = Helper.generateToken(rows[0].id, expires_in);
      return res.status(200).send({ access_token, expires_in });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default UserService;
