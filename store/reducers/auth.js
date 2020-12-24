import{LOGIN,SIGNUP,LOGIN_FROM_STORAGE, LOGOUT} from "../actions/auth";

const initialState ={
    token:null,
    userId:null
}

export default (state=initialState,action)=>{
    switch(action.type){
        case LOGIN_FROM_STORAGE:
            return{
                token:action.token,
                userId:action.userId
                
            }
        case LOGIN:
            return{
                token:action.token,
                userId:action.userId
            }

        case SIGNUP:
            return{
                token:action.token,
                userId:action.userId
            }
        case LOGOUT:
            return initialState;


        default:
            return state; 

    }
}