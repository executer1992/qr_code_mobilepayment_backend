import jwt from 'jsonwebtoken';
import {getUserByKey} from '../repository/UserRepository';

const Auth = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
        token = token.substring(7, token.length);
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const { rows } = await getUserByKey('id', [decoded.userId]);
        if(!rows[0]) {
            return res.status(400).send({ 'message': 'The token you provided is invalid' });
        }
          req.user =  rows[0];
          next();
        } catch(error) {
          return res.status(400).send(error);
        }
    }
}

export default Auth;
