import * as moment from "moment";

export interface ICreditCard {
    credit_card_id: string;
    user_id: string;
    credit_card_number: number;
    credit_card_code: number;
    credit_card_cardholder_name: string;
    credit_card_expiration_time: moment.Moment;
    created_date: moment.Moment;
}
