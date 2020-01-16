import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Helper from '../../../helpers/Helper';

class User {
  constructor(data) {
    this.id = uuidv4();
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.password = Helper.hashPassword(data.password);
    this.created_date = data.created_date || moment(new Date());
    this.modified_date = data.modified_date || moment(new Date());
  }

  get userId() {
    return this.id;
  }

  set userId(value) {
    this.id = value;
  }

  get userName() {
    return this.name;
  }

  set userName(value) {
    this.name = value;
  }

  get userSurname() {
    return this.surname;
  }

  set userSurname(value) {
    this.surname = value;
  }

  get userEmail() {
    return this.email;
  }

  set userEmail(value) {
    this.email = value;
  }

  get userPassword() {
    return this.password;
  }

  set userPassword(value) {
    this.password = value;
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

export default User;
