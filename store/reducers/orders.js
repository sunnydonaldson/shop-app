import order from "../../models/order";
import {NEW_ORDER,SET_ORDERS} from "../actions/orders";

const initialState ={
    orders:[]
};

 const ordersReducer = (state = initialState,action)=>{
    switch(action.type){
        case NEW_ORDER:
            const myOrder = new order(action.id,action.items,action.total,action.date)

            return{
                ...state,
                orders:state.orders.concat(myOrder)
            }
        case SET_ORDERS:
            return{
                orders:action.orderData
            }
        default:
            return state;

    }
}

export default ordersReducer;