import db from '../../../db_config/config';

export const getTransactionHistory = (key, val) => {
  const createQuery = `SELECT * FROM transaction_history WHERE ${key} = $1`;
  return db.query(createQuery, val);
};

export const createHistoryTransaction = (transactionHistory) => {
  const createQuery = `INSERT INTO
      transaction_history(transaction_history_id, sender_credit_card_number, receiver_credit_card_number, transaction_amount, created_date, user_id)
      VALUES($1, $2, $3, $4, $5, $6)
      `;
  const transactionHistoryValues = [
    transactionHistory.transaction_history_id,
    transactionHistory.sender_credit_card_number,
    transactionHistory.receiver_credit_card_number,
    transactionHistory.transaction_amount,
    transactionHistory.created_date,
    transactionHistory.user_id
  ];

  return db.query(createQuery, transactionHistoryValues);
};
