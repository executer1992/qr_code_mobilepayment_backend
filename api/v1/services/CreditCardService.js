import Helper from '../../../helpers/Helper';
import * as CreditCardRepository from '../repository/CreditCardRepository';

const CreditCardService = {

  async verify(req, res) {
    try {
      const { rows } = await CreditCardRepository.getCreditCard('user_id', [req.user.id]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'Your card is not connected' });
      }
    }
    catch (error) {
      return res.status(400).send(error);
    }
  },

  async connect(req, res) {
    const reqBody = req.body;
    if (!reqBody.credit_card_number || !reqBody.credit_card_code || !reqBody.credit_card_cardholder_name || !reqBody.credit_card_expiration_time) {
      return res.status(400).send({'message': 'Some values are missing'});
    }

    try {
      const { rows } = await CreditCardRepository.getCreditCard('credit_card_code', reqBody);
      const cardIsActive = Helper.isCreditCardActive(reqBody.credit_card_expiration_time, rows.credit_card_expiration_time);
      if (cardIsActive) {
        const expires_in = 24 * 60 * 60;
        const transaction_token = Helper.generateTransactionToken(reqBody.credit_card_id, expires_in);
        return res.status(201).send( { transaction_token, expires_in });
      } else {
        return res.status(400).send({ 'message': 'Credit card is not active' })
      }
    }
    catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default CreditCardService;
