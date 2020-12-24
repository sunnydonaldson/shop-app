import order from "../../models/order";
import auth from "../reducers/auth";
export const NEW_ORDER = "NEW_ORDER";
export const SET_ORDERS = "SET_ORDERS";


export const setOrders = ()=>{
    return async (dispatch,getState) =>{
            const userId = getState().auth.userId;
        try{
            const response = await fetch(`https://rn-practice-shop-app-default-rtdb.firebaseio.com/${userId}/orders.json`);
            if(!response.ok){
                throw new Error("an error has occured");
            }
            const resData = await response.json();
            const orderItems =[];
            for (const key in resData){
                const newOrder = new order(key,resData[key].cartItems,resData[key].totalCost,new Date(resData[key].date))
                orderItems.push(newOrder)
            }

            dispatch({
                type:SET_ORDERS,
                orderData:orderItems
            
            })
        }catch(err){
            throw err;
        }
        
    }

}

export const newOrder = (cartItems,totalCost) =>{
    return async (dispatch,getState) =>{
        const date = new Date().toISOString();
        const userToken = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-practice-shop-app-default-rtdb.firebaseio.com/${userId}/orders.json?auth=${userToken}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                cartItems,
                totalCost,
                date:date
            })
        });
        if(!response.ok){
            throw new Error("an error has occured");
        }
        const resData = await response.json()
        dispatch({
            type:NEW_ORDER,
            id:resData.name,
            items:cartItems,
            total:totalCost,
            date:date
    
        } )

    }
    
}