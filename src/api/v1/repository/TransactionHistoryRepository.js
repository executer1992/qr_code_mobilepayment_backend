import db from '../../../db_config/config';

export const getTransactionHistory = (key, val) => {
  const createQuery = `SELECT * FROM transaction_history WHERE ${key} = $1`;
  return db.query(createQuery, val);
};

export const createHistoryTransaction = transactionHistory => {
  const createQuery = `INSERT INTO transaction_history(
      transaction_history_id,
      sender_credit_card_number,
      receiver_credit_card_number,
      transcation_amount,
      transaction_date,
      user_id)
      VALUES($1, $2, $3, $4, $5, $6)
      `;
  const transactionHistoryValues = [
    transactionHistory.transactionHistoryId,
    transactionHistory.senderCreditCardNumber,
    transactionHistory.receiverCreditCardNumber,
    transactionHistory.transactionAmount,
    transactionHistory.createdDate,
    transactionHistory.userId
  ];

  return db.query(createQuery, transactionHistoryValues);
};
