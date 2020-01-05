import {Pool}  from 'pg';

const pool = new Pool({
  connectionString: 'postgres://postgres:Arsenal123@localhost:5432/diplomaproject'
});


 /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  const query = (text, params) => {
    return new Promise((resolve, reject) => {
        pool.query(text, params)
        .then( (res) => resolve(res))
      .catch((err) => reject(err) )
    })
  }

export const getUserByEmail = (email) => {  
  const createQuery = 'SELECT * FROM users WHERE email = $1';
    return query(createQuery, email);
  }

export const createUser = (user) => {
    const createQuery = `INSERT INTO
      users(id, name, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      `;
    const userValues = [user.id, user.name, user.email, user.password, user.created_date, user.modified_date];
    
    return query(createQuery, userValues);
  }