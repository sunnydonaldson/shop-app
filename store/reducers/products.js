import PRODUCTS from "../../data/dummy-data";
import {CREATE_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT,SET_PRODUCTS} from "../actions/products";
import product from "../../models/product";
import { ActionSheetIOS } from "react-native";


const initialState={
    availableProducts:[],
    userProducts:[]
}

const productReducer = (state = initialState,action) =>{
    switch (action.type){
        case SET_PRODUCTS:
            return{
                ...state,
                availableProducts:action.products,
                userProducts:action.userProducts
            }
        case CREATE_PRODUCT:
            const newProduct = new product(action.productData.id,action.productData.ownerId,action.productData.title,action.productData.imageUrl,action.productData.description,action.productData.price)
            return{
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
                ...state,
                availableProducts:updatedAvailableProducts,
                userProducts:updatedUserProducts
            }

        case DELETE_PRODUCT:
            return{
                ...state,
                availableProducts:state.availableProducts,
                userProducts:state.userProducts.filter(item=> item.id !== action.productId),
                availableProducts:state.availableProducts.filter(item=> item.id !== action.productId)

            }

    }
    return state;
}

export default productReducer;