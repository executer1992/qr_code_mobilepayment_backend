import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @param {string} expireTime
   * @returns {string} token
   */
  generateToken(id, expireTime) {
    const token = jwt.sign(
      {
        userId: id
      },
      process.env.SECRET_KEY,
      { expiresIn: expireTime }
    );
    return token;
  },

  /**
   * isCreditCardActive helper method
   * @param {moment.Moment} dbCreditCard
   * @returns {Boolean} True or False
   */
  isCreditCardActive(dbCreditCard) {
    return moment().isBefore(moment(dbCreditCard));
  },

  /**
   * handleTransactions helper method
   * @param {TransactionHistory} transactionHistory
   * @param {number} creditCardNumber
   * @returns {object}
   */
  handleTransactions(transactionHistory, creditCardNumber) {
    const transactionsMade = transactionHistory.filter(
        transHis => transHis.sender_credit_card_number === creditCardNumber
    );
    const transactionsReceived = transactionHistory.filter(
        transHis => transHis.receiver_credit_card_number === creditCardNumber
    );

    const payedSum = transactionsMade
        .map(transaction => Number(transaction.transaction_amount))
        .reduce((a, b) => {
          return a + b;
        }, 0);
    const receivedSum = transactionsReceived
        .map(transaction => Number(transaction.transaction_amount))
        .reduce((a, b) => {
          return a + b;
        }, 0);
    const balance = receivedSum - payedSum;

    return {
      transactionsMade,
      transactionsReceived,
      payedSum,
      balance,
      receivedSum
    }
  }
};

export default Helper;
