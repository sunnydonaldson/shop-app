import { ActionSheetIOS } from "react-native";
import product from "../../models/product";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts= ()=>{
    return async (dispatch,getState) =>{
        const userId = getState().auth.userId

        try{
            const response = await fetch("https://rn-practice-shop-app-default-rtdb.firebaseio.com/products.json?");
            if(!response.ok){
                throw new Error("something went wrong")
            }
            const resData = await response.json();
            const transformedData = [];
            for(key in resData){
            const newProduct = new product(key,resData[key].ownerId,resData[key].title,resData[key].imageUrl,resData[key].description,resData[key].price)
            transformedData.push(newProduct)
            }

            dispatch({
                type:SET_PRODUCTS,
                products:transformedData,
                userProducts:transformedData.filter(product=>product.ownerID === userId)})
        }catch(err){
            throw err; 
        }
    }
}

export const createProduct = (title,price,imageUrl,description) =>{
    //the productData object uses a new syntax,
    //where if the key and value of each property are the same, you just have to type it once
    //it works exactly the same as title:title
    return async (dispatch,getState) =>{
        //any code here will run asynchronously and not break the app
        const userToken  = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-practice-shop-app-default-rtdb.firebaseio.com/products.json?auth=${userToken}`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                title,
                price,
                imageUrl,
                description,
                ownerId:userId
            })
        });

        const resData = await response.json()
        dispatch({
            type:CREATE_PRODUCT,
            productData:{
                id:resData.name,
                title,
                price,
                imageUrl,
                description,
                ownerId:userId
            }
        })
    }
}

export const updateProduct = (productId,title,imageUrl,description) =>{
    return async (dispatch,getState) =>{
        const userToken = getState().auth.token;
        const response = await fetch(`https://rn-practice-shop-app-default-rtdb.firebaseio.com/products/${productId}.json?auth=${userToken}`,{
            method:'PATCH',
            headers:{
                "Content-Type":"application/json"
                
            },
            body:JSON.stringify({title,imageUrl,description})
        })
        if(!response.ok){
            throw(new Error("something went wrong"))
        }
        dispatch({
            type:UPDATE_PRODUCT,
            productId,
            productData:{
                title,
                imageUrl,
                description
    
            }
        })
    }
    
}


export const deleteProduct = productKey => {
    return async dispatch =>{
       const response =  await fetch(`https://rn-practice-shop-app-default-rtdb.firebaseio.com/products/${productKey}.json`,{
            method:'DELETE'
        })

        if(!response.ok){
            throw(new Error("an error has occured"))
        }
        dispatch({
            type:DELETE_PRODUCT,
            productId:productKey
    
        })
    }
    
    
}