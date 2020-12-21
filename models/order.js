import moment from "moment";

export default class order{
    constructor(id,items,cost,date){
        this.id = id;
        this.items = items;
        this.cost = cost;
        this.date = date;
    }
    get readableDate (){
        return moment(this.date).format("Do MMM YYYY hh:mm")
    }

}