import db from '../../../db_config/config';

export const getUserByKey = (key, val) => {
  const createQuery = `SELECT * FROM users WHERE ${key} = $1`;
  return db.query(createQuery, val);
};

export const changePassword = (userValues, user_id) => {
  const createQuery = `UPDATE users
    SET (password, modified_date)
    VALUES($1, $2)
    WHERE id = ${user_id}
    `;
  return db.query(createQuery, userValues);
};

export const createUser = user => {
  const createQuery = `INSERT INTO
      users(id, name, surname, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      `;
  const userValues = [user.id, user.name, user.surname, user.email, user.password, user.created_date, user.modified_date];

  return db.query(createQuery, userValues);
};
