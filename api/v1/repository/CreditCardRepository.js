import db from '../../../db_config/config';

export const getCreditCard = (key, val) => {
    const createQuery = `SELECT * FROM credit_card WHERE ${key} = $1`;
    return db.query(createQuery, val.credit_card_code);

}
