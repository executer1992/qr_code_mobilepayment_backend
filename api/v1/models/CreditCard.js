import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from '../../../helpers/Helper';

class CreditCard {
    constructor(data) {
        this._id = uuidv4();
        this._user_id = data.user.user_id;
        this._credit_card_number = data.credit_card_number;
        this._credit_card_cardholder_name = data.credit_card_cardholder_name;
        this._credit_card_code = data.credit_card_code;
        this._credit_card_expiration_time = moment(new Date()).add(1, 'years');
        this._created_date = moment(new Date());
    }

    get id() {
        return this._id;
    }

    get userId() {
        return this._user_id;
    }

    get creditCardNumber() {
        return this._credit_card_number;
    }

    get creditCardHolderName() {
        return this._credit_card_cardholder_name;
    }

    get creditCardCode() {
        return this._credit_card_code;
    }

    get creditCardExpirationTime() {
        return this._credit_card_expiration_time;
    }

    get createDate() {
        return this._created_date;
    }
}

export default CreditCard;
