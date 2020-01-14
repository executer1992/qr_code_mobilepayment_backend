import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from '../../../helpers/Helper';

class CreditCard {
  constructor(data) {
    this._credit_card_id = uuidv4();
    this._user_id = data.user.id;
    this._credit_card_number = data.credit_card_number;
    this._credit_card_cardholder_name = data.credit_card_cardholder_name;
    this._credit_card_code = data.credit_card_code;
    this._credit_card_expiration_time = data.credit_card_expiration_time || moment(new Date()).add(1, 'years');
    this._created_date = data._created_date || moment(new Date());
  }

  set id(value) {
    this._credit_card_id = value;
  }

  set user_id(value) {
    this._user_id = value;
  }

  set credit_card_number(value) {
    this._credit_card_number = value;
  }

  set credit_card_cardholder_name(value) {
    this._credit_card_cardholder_name = value;
  }

  set credit_card_code(value) {
    this._credit_card_code = value;
  }

  set credit_card_expiration_time(value) {
    this._credit_card_expiration_time = value;
  }

  set created_date(value) {
    this._created_date = value;
  }

  get credit_card_id() {
    return this._credit_card_id;
  }

  get user_id() {
    return this._user_id;
  }

  get credit_card_number() {
    return this._credit_card_number;
  }

  get credit_card_cardholder_name() {
    return this._credit_card_cardholder_name;
  }

  get credit_card_code() {
    return this._credit_card_code;
  }

  get credit_card_expiration_time() {
    return this._credit_card_expiration_time;
  }

  get created_date() {
    return this._created_date;
  }
}

export default CreditCard;
