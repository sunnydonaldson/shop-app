import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import {NEW_ORDER} from "../actions/orders"
import cartItem from "../../models/cartItem";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    cartItems:{},
    sum: 0
}

export default (state=initialState,action) =>{

    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const title = addedProduct.title;
            const price = addedProduct.price;
            if(state.cartItems[addedProduct.id]){
                //already has the item in the cart
                const updatedCartItem = new cartItem(title,price,state.cartItems[addedProduct.id].quantity+1,state.cartItems[addedProduct.id].sum+addedProduct.price)
                return{
                    ...state,
                    cartItems:{...state.cartItems,[addedProduct.id]:updatedCartItem},
                    sum:state.sum + price
                }
            
            }else{
                const newCartItem = new cartItem(addedProduct.title,addedProduct.price,1,addedProduct.price)
                return{
                    ...state,
                    cartItems:{...state.cartItems,[addedProduct.id]:newCartItem},
                    sum:state.sum + price
            }
            

            }
        case REMOVE_FROM_CART:
            console.log("running remove frome cart")
            const prodId = action.productID;
            const currentQty = state.cartItems[prodId].quantity
            const currentItems = {...state.cartItems};
            if(currentQty > 1){
                console.log("coins")
                const updatedItem = new cartItem(currentItems[prodId].title,currentItems[prodId].price,currentItems[prodId].quantity-1,currentItems[prodId].sum-currentItems[prodId].price)
                return{
                    cartItems:{...currentItems,[prodId]:updatedItem},
                     sum:state.sum - state.cartItems[prodId].price
                }
            }else{
                console.log("less than 1")
                delete currentItems[prodId] 
                return{
                    cartItems:{...currentItems},
                    sum:state.sum - state.cartItems[prodId].price

            }
            
            }
        case NEW_ORDER:
            return initialState;
        default:
            return state;

        case DELETE_PRODUCT:
            if(!state.cartItems[action.productId]){
                return state;
            }else{
                const updatedCartItems = {...state.cartItems};
                delete updatedCartItems[action.productId];
                return{
                    cartItems:{...updatedCartItems},
                    sum:state.sum - state.cartItems[action.productId].sum
                }
            }
            
            
    }
  
}