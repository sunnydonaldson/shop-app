import {AsyncStorage} from "react-native";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGIN_FROM_STORAGE = 'LOGIN_FROM_STORAGE';
export const LOGOUT = "LOGOUT";

//const apiKey = "***REMOVED***"

export const loginFromStorage = (token,userId) =>{
    return{
        type:LOGIN_FROM_STORAGE,
        token:token,
        userId:userId
    }
}

export const signup = (email,password)=>{
    return async dispatch =>{
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=***REMOVED***",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
            
        })
        if(!response.ok){
            let message = "an error has occured";
            const errorData = await response.json();
            const errorId = errorData.error.message;
            if(errorId === "EMAIL_EXISTS"){
                message="an account with the email already exists"
            }else if(errorId = "TOO_MANY_ATTEMPTS_TRY_LATER"){
                new Error("we've detected suspicious activity on this device, please try again later")
            }
            throw new Error(message);
        }
        const resData = await response.json();
        console.log(resData);
        dispatch({type:SIGNUP,token:resData.idToken,userId:resData.localId})
        const expirationDate = new date(new Date().getTime() + parseInt(resData.expiresIn)*1000) 
        saveDataToStorage(resData.idToken,resData.localId,expirationDate)
        // dispatch({
        //     type:SIGNUP,
        //     // idToken:resData.idToken,
        //     // refreshToken:resData.refreshToken,
        //     // expiresIn:resData.expiresIn
        // })
    }
}

export const login = (email,password)=>{
    return async dispatch =>{
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=***REMOVED***",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        if(!response.ok){
            let message = "something went wrong"
            const errorData = await response.json()
            const errorId = errorData.error.message;
            if(errorId === "EMAIL_NOT_FOUND"){
                message="there aren't any accounts with that address"
                
            }else if(errorId ==="INVALID_PASSWORD"){
                message="that password is incorrect"
            }else if(errorId ==="USER_DISABLED"){
                message="your account has been disable until further notice"
            }
            throw new Error (message)
        }
        const resData = await response.json();
        console.log(resData)
        dispatch({type:LOGIN,token:resData.idToken,userId:resData.localId})
        
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken,resData.localId,expirationDate)
    }
}

const saveDataToStorage = (token,userId,expirationDate)=>{
    AsyncStorage.setItem("userData",JSON.stringify({
        token:token,
        userId:userId,
        expirationDate:expirationDate.toISOString()
    }))
}

export const logout = ()=>{
   return{type:LOGOUT} 
}