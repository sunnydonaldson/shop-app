export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const createProduct = (title,price,imageUrl,description) =>{
    //the productData object uses a new syntax,
    //where if the key and value of each property are the same, you just have to type it once
    //it works exactly the same as title:title
    return{
        type:CREATE_PRODUCT,
        productData:{
            title,
            price,
            imageUrl,
            description
        }
    }
}

export const updateProduct = (productId,title,imageUrl,description) =>{
    return{
        type:UPDATE_PRODUCT,
        productId,
        productData:{
            title,
            imageUrl,
            description

        }
    }
}


export const deleteProduct = productKey => {
    return{
        type:DELETE_PRODUCT,
        productId:productKey

    }
    
}