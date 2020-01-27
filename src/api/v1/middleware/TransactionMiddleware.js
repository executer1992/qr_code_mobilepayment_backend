import { getCreditCard } from '../repository/CreditCardRepository';

const TransactionMiddleware = {

  async verifyTransactionData(req, res, next) {

    try {
      const client  = await getCreditCard('user_id', [req.body.sender_id]);
      const sender = await getCreditCard('user_id', [req.body.user.id]);

      if (!sender.rows[0] || !client.rows[0]) {
        return res.status(400).send({ message: 'You have no active card' });
      }

      req.body.client = client.rows[0];
      req.body.sender = sender.rows[0];
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default TransactionMiddleware;
