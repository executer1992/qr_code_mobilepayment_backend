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
    this._created_date = data.created_date || moment(new Date());
    this._modified_date = data.modified_date || moment(new Date());
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get surname() {
    return this._surname;
  }

  set surname(value) {
    this._surname = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
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

export default User;
