import * as TransactionRepository from '../repository/TransactionHistoryRepository';
import TransactionHistory from '../models/TransactionHistory';
import * as CreditCardRepository from '../repository/CreditCardRepository';

const TransactionHistoryService = {

    async balance(req, res) {
        try {
            const { transactionHistory } = await TransactionRepository.getTransactionHistory('user_id', [req.body.user.id])[0];
            const { creditCard } = await CreditCardRepository.getCreditCard('user_id', [req.body.user.id])[0];

            if(!transactionHistory || !creditCard) {
                return res.status(400).send({ 'message': 'You have no transaction history' });
            }
            const payedSum = transactionHistory.filter(transHis => transHis.sender_credit_card_number === creditCardNumber.creditCardNumber).reduce( (a, b) => {return a + b}, 0);
            const recievedSum = transactionHistory.filter(transHis => transHis.sender_credit_card_number !== creditCardNumber.creditCardNumber).reduce( (a, b) => {return a + b}, 0);
            return res.status(200).send({
                payedSum,recievedSum
            });
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },

    async addTransaction(req, res) {
        const reqBody = req.body;
        if (!reqBody.sender_credit_card_number || !reqBody.receiver_credit_card_number || !reqBody.transcation_ammount) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        try {
            const { rows } = await TransactionRepository.createHistoryTransaction(new TransactionHistory(reqBody));
            return res.status(201).send(rows);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }

}

export default TransactionHistoryService;
