import moment from './CreditCard';

class TransactionHistory {
  constructor(data) {
    this._id = uuidv4();
    this._sender_credit_card_number = data.sender_credit_card_number;
    this._receiver_credit_card_number = data.receiver_credit_card_number;
    this._transcation_ammount = data.transcation_ammount;
    this._transcation_data = moment(new Date());
    this._user_id = data.user.user_id;
  }

  get id() {
    return this._id;
  }

  get sender_credit_card_number() {
    return this._sender_credit_card_number;
  }

  get receiver_credit_card_number() {
    return this._receiver_credit_card_number;
  }

  get transcation_ammount() {
    return this._transcation_ammount;
  }

  get transcation_data() {
    return this._transcation_data;
  }

  get user_id() {
    return this._user_id;
  }
}

export default TransactionHistory;
