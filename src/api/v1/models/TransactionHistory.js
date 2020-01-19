import moment from './CreditCard';

class TransactionHistory {
  constructor(data) {
    this.transaction_history_id = uuidv4();
    this.sender_credit_card_number = data.sender.sender_credit_card_number;
    this.receiver_credit_card_number = data.client.receiver_credit_card_number;
    this.transaction_amount = data.transaction_amount;
    this.created_date = data.created_date || moment(new Date());
    this.user_id = data.user.id;
  }

  set transactionHistoryId(value) {
    this.transaction_history_id = value;
  }

  set senderCreditCardNumber(value) {
    this.sender_credit_card_number = value;
  }

  set receiverCreditCardNumber(value) {
    this.receiver_credit_card_number = value;
  }

  set transactionAmount(value) {
    this.transaction_amount = value;
  }

  set createdDate(value) {
    this.created_date = value;
  }

  set userId(value) {
    this.user_id = value;
  }

  get transactionHistoryId() {
    return this.transaction_history_id;
  }

  get senderCreditCardNumber() {
    return this.sender_credit_card_number;
  }

  get receiverCreditCardNumber() {
    return this.receiver_credit_card_number;
  }

  get transactionAmount() {
    return this.transaction_amount;
  }

  get createdDate() {
    return this.created_date;
  }

  get userId() {
    return this.user_id;
  }
}

export default TransactionHistory;
