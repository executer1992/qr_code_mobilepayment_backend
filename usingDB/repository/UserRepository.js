// import {Pool}  from 'pg';

// const pool = new Pool({
//   connectionString: 'postgres://postgres:Arsenal123@localhost:5432/diplomaproject'
// });
import db from '../db/config';



export const getUserByEmail = (email) => {  
  const createQuery = 'SELECT * FROM users WHERE email = $1';
    return db.query(createQuery, [email]);
  }

export const createUser = (user) => {
    const createQuery = `INSERT INTO
      users(id, name, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      `;
    const userValues = [user.id, user.name, user.email, user.password, user.created_date, user.modified_date];
    
    return db.query(createQuery, userValues);
  }