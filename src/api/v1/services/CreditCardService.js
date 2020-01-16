import * as CreditCardRepository from '../repository/CreditCardRepository';
import CreditCard from '../models/CreditCard';

const CreditCardService = {
  async verify(req, res) {
    try {
      const { rows } = await CreditCardRepository.getCreditCard('user_id', [req.body.user.id]);

      if (!rows[0]) {
        return res.status(400).send({ message: 'Your card is not connected' });
      }

      return res.status(200).send();
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async create(req, res) {
    const reqBody = req.body;
    if (!reqBody.credit_card_number || !reqBody.credit_card_code || !reqBody.credit_card_cardholder_name) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    try {
      const { rows } = await CreditCardRepository.createCreditCard(new CreditCard(reqBody));
      return res.status(201).send();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default CreditCardService;
