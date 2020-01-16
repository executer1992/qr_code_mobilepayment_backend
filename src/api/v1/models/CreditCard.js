import moment from 'moment';
import uuidv4 from 'uuid/v4';


class CreditCard {
  constructor(data) {
    this.credit_card_id = uuidv4();
    this.user_id = data.user.id;
    this.credit_card_number = data.credit_card_number;
    this.credit_card_cardholder_name = data.credit_card_cardholder_name;
    this.credit_card_code = data.credit_card_code;
    this.credit_card_expiration_time =
      data.credit_card_expiration_time || moment(new Date()).add(1, 'years');
    this.created_date = data.created_date || moment(new Date());
  }

  set creditCardId(value) {
    this.credit_card_id = value;
  }

  set userId(value) {
    this.user_id = value;
  }

  set creditCardNumber(value) {
    this.credit_card_number = value;
  }

  set creditCardCardholderName(value) {
    this.credit_card_cardholder_name = value;
  }

  set creditCardCode(value) {
    this.credit_card_code = value;
  }

  set creditCardExpirationTime(value) {
    this.credit_card_expiration_time = value;
  }

  set createdDate(value) {
    this.created_date = value;
  }

  get creditCardId() {
    return this.credit_card_id;
  }

  get userId() {
    return this.user_id;
  }

  get creditCardNumber() {
    return this.credit_card_number;
  }

  get creditCardCardholderName() {
    return this.credit_card_cardholder_name;
  }

  get creditCardCode() {
    return this.credit_card_code;
  }

  get creditCardExpirationTime() {
    return this.credit_card_expiration_time;
  }

  get createdDate() {
    return this.created_date;
  }
}

export default CreditCard;
