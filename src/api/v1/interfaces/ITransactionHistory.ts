import * as moment from "moment";

export interface ITransactionHistory {
    transaction_history_id: string;
    user_id: string;
    sender_credit_card_number: number;
    receiver_credit_card_number: number;
    transaction_amount: number;
    transaction_data: number;
    created_date: moment.Moment;
}
