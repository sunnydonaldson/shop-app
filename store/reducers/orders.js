import order from "../../models/order";
import {NEW_ORDER} from "../actions/orders";

const initialState ={
    orders:[]
};

 const ordersReducer = (state = initialState,action)=>{
    const date = new Date;
    switch(action.type){
        case NEW_ORDER:
            const myOrder = new order(date.toString(),action.items,action.total,date)
            console.log(myOrder.date)
            return{
                ...state,
                orders:[...state.orders,myOrder]
            }
        default:
            console.log("default")
            return state;

    }
}

export default ordersReducer;