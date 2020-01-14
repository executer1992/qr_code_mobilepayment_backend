import * as moment from "moment";

export interface IProduct {
    product_id: string;
    product_name: string;
    product_price: number;
    created_date: moment.Moment;
    modified_date: moment.Moment;
}
