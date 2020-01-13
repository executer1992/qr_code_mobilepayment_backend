import db from '../../../db_config/config';

export const getCreditCard = (key, val) => {
  const createQuery = `SELECT * FROM credit_card WHERE ${key} = $1`;
  return db.query(createQuery, val);
};

export const createCreditCard = creditCard => {
  const createQuery = `INSERT INTO
      credit_card(credit_card_id, user_id,credit_card_number,credit_card_code,credit_card_cardholder_name,credit_card_expiration_time,created_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      `;
  const creditCardValues = [
    creditCard.id,
    creditCard.userId,
    creditCard.creditCardNumber,
    creditCard.creditCardCode,
    creditCard.creditCardHolderName,
    creditCard.creditCardExpirationTime,
    creditCard.createDate
  ];
  return db.query(createQuery, creditCardValues);
};
