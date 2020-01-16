import * as TransactionRepository from '../repository/TransactionHistoryRepository';
import TransactionHistory from '../models/TransactionHistory';
import * as CreditCardRepository from '../repository/CreditCardRepository';

const TransactionHistoryService = {
  async balance(req, res) {
    try {

      const { transactionHistory } = await TransactionRepository.getTransactionHistory('user_id', [req.body.user.id]);
      const { creditCard } = await CreditCardRepository.getCreditCard('user_id', [req.body.user.id]);

      if (!transactionHistory || !creditCard) {
        return res.status(200).send({
          payedSum: 0,
          receivedSum: 0,
          balance: 0
        });
      }
      const transactionsMade = transactionHistory.filter(transHis => transHis.senderCreditCardNumber === creditCard[0].creditCardNumber);
      const transactionsReceived = transactionHistory.filter(
        transHis => transHis.senderCreditCardNumber !== creditCard[0].creditCardNumber
      );

      const payedSum = transactionsMade.reduce((a, b) => {
        return a + b;
      }, 0);
      const receivedSum = transactionsReceived.reduce((a, b) => {
        return a + b;
      }, 0);
      const balance = receivedSum - payedSum;

      return res.status(200).send({
        transactionsMade,
        transactionsReceived,
        payedSum,
        balance,
        receivedSum
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async addTransaction(req, res) {
    const reqBody = req.body;
    if (!reqBody.sender_credit_card_number || !reqBody.receiver_credit_card_number || !reqBody.transaction_amount) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    try {
      const { rows } = await TransactionRepository.createHistoryTransaction(new TransactionHistory(reqBody));
      return res.status(201).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default TransactionHistoryService;
