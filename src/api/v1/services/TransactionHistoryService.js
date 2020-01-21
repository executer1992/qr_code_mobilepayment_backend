import * as TransactionRepository from '../repository/TransactionHistoryRepository';
import TransactionHistory from '../models/TransactionHistory';
import * as CreditCardRepository from '../repository/CreditCardRepository';
import Helper from "../../../helpers/Helper";

const TransactionHistoryService = {
  async balance(req, res) {
    try {
      const creditCardNumber = await CreditCardRepository.getCreditCard(
        'user_id',
        [req.body.user.id]
      ).then(res => {
        if (res.rows[0]) {
          return res.rows[0].credit_card_number;
        }
      });
      const transactionHistory = await TransactionRepository.getTransactionHistory(
        creditCardNumber
      ).then(res => res.rows);

      if (!transactionHistory[0]) {
        return res.status(200).send({
          payedSum: 0,
          receivedSum: 0,
          balance: 0
        });
      }

      const transactionResponse = Helper.handleTransactions(transactionHistory, creditCardNumber);
      return res.status(200).send(transactionResponse);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async addTransaction(req, res) {
    const reqBody = req.body;
    try {
      await TransactionRepository.createHistoryTransaction(
        new TransactionHistory(reqBody)
      );
      return res.status(201).send();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default TransactionHistoryService;
