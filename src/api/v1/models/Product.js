import moment from 'moment';
import uuidv4 from 'uuid/v4';

class Product {

    constructor(data) {
        this.product_id = uuidv4();
        this.user_id = data.user.id;
        this.product_name = data.product_name;
        this.product_price = data.product_price;
        this.created_date = data.created_date || moment(new Date());
        this.modified_date = data.modified_date || moment(new Date());
    }

    get userId() {
        return this.user_id;
    }

    set userId(value) {
        this.user_id = value;
    }

    get productId() {
        return this.product_id;
    }

    set productId(value) {
        this.product_id = value;
    }

    get productName() {
        return this.product_name;
    }

    set productName(value) {
        this.product_name = value;
    }

    get productPrice() {
        return this.product_price;
    }

    set productPrice(value) {
        this.product_price = value;
    }

    get createdDate() {
        return this.created_date;
    }

    set createdDate(value) {
        this.created_date = value;
    }

    get modifiedDate() {
        return this.modified_date;
    }

    set modifiedDate(value) {
        this.modified_date = value;
    }
}

export default Product;
