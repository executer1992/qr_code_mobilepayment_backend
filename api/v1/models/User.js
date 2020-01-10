import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from '../../../helpers/Helper';

class User {
    constructor(data) {
        this._id = uuidv4();
        this._name = data.name;
        this._surname = data.surname;
        this._email = data.email;
        this._password = Helper.hashPassword(data.password);
        this._created_date = moment(new Date());
        this._modified_date = moment(new Date());
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get surname() {
        return this._surname;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get created_date() {
        return this._created_date;
    }

    get modified_date() {
        return this._modified_date;
    }
}

export default User;
