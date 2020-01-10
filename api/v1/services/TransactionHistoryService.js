import * as TransactionRepository from '../repository/TransactionHistoryRepository';
import TransactionHistory from '../models/TransactionHistory';

const TransactionHistoryService = {

    async balance(req, res) {
        try {
            const { rows } = await TransactionRepository.getTransactionHistory('user_id', [req.user.id]);
            if(!rows[0]) {
                return res.status(400).send({ 'message': 'You have no transaction history' });
            }
            return res.status(200).send(rows);
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
