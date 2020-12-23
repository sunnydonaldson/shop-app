import PRODUCTS from "../../data/dummy-data";
import {CREATE_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT,SET_PRODUCTS} from "../actions/products";
import product from "../../models/product";
import { ActionSheetIOS } from "react-native";


const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(product => product.ownerID === "u1")
}

const productReducer = (state = initialState,action) =>{
    switch (action.type){
        case SET_PRODUCTS:
            return{
                availableProducts:action.products,
                userProducts:action.products.filter(product=> product.ownerID ==="u1")
            }
        case CREATE_PRODUCT:
            const newProduct = new product(action.productData.id,"u1",action.productData.title,action.productData.imageUrl,action.productData.description,action.productData.price)
            return{
                ...state,
                availableProducts:[
                    ...state.availableProducts,
                    newProduct
                    
                ],
                userProducts:[
                    ...state.userProducts,
                    newProduct
                ]
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(product=> product.id === action.productId)
            const updatedProduct = new product(
                    action.productId,
                    state.userProducts[productIndex].ownerID,
                    action.productData.title,
                    action.productData.imageUrl,
                    action.productData.description,
                    state.userProducts[productIndex].price
                )
                const updatedUserProducts = [...state.userProducts];
                updatedUserProducts[productIndex] = updatedProduct;

                const availableProductIndex = state.availableProducts.findIndex(product => product.id === action.productId);
                const updatedAvailableProducts = [...state.availableProducts];
                updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return{
                availableProducts:updatedAvailableProducts,
                userProducts:updatedUserProducts
            }

        case DELETE_PRODUCT:
            return{
                availableProducts:state.availableProducts,
                userProducts:state.userProducts.filter(item=> item.id !== action.productId),
                availableProducts:state.availableProducts.filter(item=> item.id !== action.productId)

            }

    }
    return state;
}

export default productReducer;