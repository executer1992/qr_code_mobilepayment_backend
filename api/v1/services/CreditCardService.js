import Helper from '../../../helpers/Helper';
import * as CreditCardRepository from '../repository/CreditCardRepository';
import CreditCard from "../models/CreditCard";

const CreditCardService = {

  async verify(req, res) {
    try {
      const { rows } = await CreditCardRepository.getCreditCard('user_id', [req.user.id]);

      if(!rows[0]) {
        return res.status(400).send({ 'message': 'Your card is not connected' });
      }
      // const cardIsActive = Helper.isCreditCardActive(rows[0].credit_card_expiration_time);
      // if (!cardIsActive) {
      //   return res.status(400).send({'message': 'Credit card is not active'})
      // }
      return res.status(200).send();
    }
    catch (error) {
      return res.status(400).send(error);
    }
  },

  async create(req, res) {
    const reqBody = req.body;
    if (!reqBody.credit_card_number || !reqBody.credit_card_code || !reqBody.credit_card_cardholder_name || !reqBody.credit_card_expiration_time) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    try {
      await CreditCardRepository.createCreditCard('credit_card_code', new CreditCard(reqBody));
        return res.status(201).send();
    }
    catch (error) {
      return res.status(400).send(error);
    }
  }

}

export default CreditCardService;
