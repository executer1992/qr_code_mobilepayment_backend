import * as moment from "moment";

export interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    created_date: moment.Moment;
    modified_date: moment.Moment;

}
