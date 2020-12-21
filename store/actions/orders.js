export const NEW_ORDER = "NEW_ORDER";

export const newOrder = (cartItems,totalCost) =>{
    return{
        type:NEW_ORDER,
        items:cartItems,
        total:totalCost

    }
}