import moment from 'moment';
import uuidv4 from 'uuid/v4';

class Product {

    constructor(data) {
        this._product_id = uuidv4();
        this._user_id = data.user.id;
        this._product_name = data.product_name;
        this._product_price = data.product_price;
        this._created_date = data.created_date || moment(new Date());
        this._modified_date = data.modified_date || moment(new Date());
    }

    get user_id() {
        return this._user_id;
    }

    set user_id(value) {
        this._user_id = value;
    }

    get product_id() {
        return this._product_id;
    }

    set product_id(value) {
        this._product_id = value;
    }

    get product_name() {
        return this._product_name;
    }

    set product_name(value) {
        this._product_name = value;
    }

    get product_price() {
        return this._product_price;
    }

    set product_price(value) {
        this._product_price = value;
    }

    get created_date() {
        return this._created_date;
    }

    set created_date(value) {
        this._created_date = value;
    }

    get modified_date() {
        return this._modified_date;
    }

    set modified_date(value) {
        this._modified_date = value;
    }
}

export default Product;
