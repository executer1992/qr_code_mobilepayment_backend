import moment from './CreditCard';

class TransactionHistory {
  constructor(data) {
    this._transaction_history_id = uuidv4();
    this._sender_credit_card_number = data.sender_credit_card_number;
    this._receiver_credit_card_number = data.receiver_credit_card_number;
    this._transaction_amount = data.transaction_amount;
    this._created_date = data.created_date || moment(new Date());
    this._user_id = data.user.user_id;
  }

  set transaction_history_id(value) {
    this._transaction_history_id = value;
  }

  set sender_credit_card_number(value) {
    this._sender_credit_card_number = value;
  }

  set receiver_credit_card_number(value) {
    this._receiver_credit_card_number = value;
  }

  set transaction_amount(value) {
    this._transcation_ammount = value;
  }

  set created_date(value) {
    this._created_date = value;
  }

  set user_id(value) {
    this._user_id = value;
  }

  get transaction_history_id() {
    return this._transaction_history_id;
  }

  get sender_credit_card_number() {
    return this._sender_credit_card_number;
  }

  get receiver_credit_card_number() {
    return this._receiver_credit_card_number;
  }

  get transaction_amount() {
    return this._transcation_ammount;
  }

  get created_date() {
    return this._created_date;
  }

  get user_id() {
    return this._user_id;
  }
}

export default TransactionHistory;
