import product from "../../models/product";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts= ()=>{
    return async dispatch =>{
        try{
            const response = await fetch("https://rn-practice-shop-app-default-rtdb.firebaseio.com/products.json");
            if(!response.ok){
                throw new Error("something went wrong")
            }
            const resData = await response.json();
            const transformedData = [];
            for(key in resData){
            const newProduct = new product(key,"u1",resData[key].title,resData[key].imageUrl,resData[key].description,resData[key].price)
            transformedData.push(newProduct)
            }

            console.log(resData)
            dispatch({type:SET_PRODUCTS,products:transformedData})
        }catch(err){
            console.log(err)
            throw err; 
        }
    }
}

export const createProduct = (title,price,imageUrl,description) =>{
    //the productData object uses a new syntax,
    //where if the key and value of each property are the same, you just have to type it once
    //it works exactly the same as title:title
    return async dispatch =>{
        //any code here will run asynchronously and not break the app
        const response = await fetch("https://rn-practice-shop-app-default-rtdb.firebaseio.com/products.json",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                title,
                price,
                imageUrl,
                description
            })
        });

        const resData = await response.json()
        console.log(resData)
        dispatch({
            type:CREATE_PRODUCT,
            productData:{
                id:resData.name,
                title,
                price,
                imageUrl,
                description
            }
        })
    }
}

export const updateProduct = (productId,title,imageUrl,description) =>{
    return async dispatch =>{
        const response = await fetch(`https://rn-practice-shop-app-default-rtdb.firebaseio.com/products/${productId}.json`,{
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