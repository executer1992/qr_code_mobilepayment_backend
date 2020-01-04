import {Pool}  from 'pg';
const path = require('path')

// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
  
});

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query(text, params){
    return new Promise((resolve, reject) => {
        pool.query(text, params)
        .then( (res) => resolve(res))
      .catch((err) => reject(err) )
    })
  }
}