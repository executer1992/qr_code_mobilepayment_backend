import db from '../db/config';

export const getUserByKey = (key, val) => {  
  const createQuery = `SELECT * FROM users WHERE ${key} = $1`;
    return db.query(createQuery, [val]);
  }

export const createUser = (user) => {
    const createQuery = `INSERT INTO
      users(id, name, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      `;
    const userValues = [user.id, user.name, user.email, user.password, user.created_date, user.modified_date];
    
    return db.query(createQuery, userValues);
  }