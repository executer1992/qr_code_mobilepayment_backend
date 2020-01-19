import { getCreditCard } from '../repository/CreditCardRepository';

const TransactionMiddleware = {

  async verifyTransactionData(req, res, next) {
    try {
      const { sender } = await getCreditCard('user_id', [req.body.sender_id])[0];
      const { client } = await getCreditCard('user_id', [req.body.user.id])[0];

      if (!sender || !client) {
        return res.status(400).send({ message: 'You have no active card' });
      }

      req.body.client = client;
      req.body.sender = sender;

      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default TransactionMiddleware;
