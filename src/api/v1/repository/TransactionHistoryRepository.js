import db from '../../../db_config/config';

export const getTransactionHistory = creditCardNumber => {
  const createQuery = `SELECT * FROM transaction_history WHERE receiver_credit_card_number = ${creditCardNumber} OR sender_credit_card_number = ${creditCardNumber}`;
  return db.query(createQuery);
};

export const createHistoryTransaction = transactionHistory => {
  const createQuery = `INSERT INTO transaction_history(
      transaction_history_id,
      sender_credit_card_number,
      receiver_credit_card_number,
      transaction_amount,
      created_date,
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
