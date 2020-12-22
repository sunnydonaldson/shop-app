import React,{useReducer} from "react";
import {View,Text,StyleSheet,TextInput} from "react-native";

const inputReducer =(state,action)=>{
    if(action.type === "CHANGE_TEXT"){
        return{
            ...state,
            value:action.value,
            isValid:action.isValid,
        }
        

    }
    if(action.type === 'INPUT_BLUR'){
        return{
            ...state,
            touched:true
        }
    
    }else{
        return state;
    }
}

const Input = props =>{
    const [inputState,inputStateDispatch] = useReducer(inputReducer,{
        value:props.initialValue?props.initialValue:"",
        isValid:props.isValid,
        touched:false,
    })

    const textChangeHandler= text =>{

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }

        inputStateDispatch({type:"CHANGE_TEXT",value:text,isValid:isValid})

    }

    const focusChangeHandler = ()=>{
        inputStateDispatch({type:'INPUT_BLUR'})
    }
    const  {onInputChange,id} = props;
    React.useEffect(()=>{
        if(inputState.touched){
            props.onInputChange(id,inputState.value,inputState.isValid)
        }
    },[inputState,onInputChange,id ])


    return(
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                value={inputState.value} 
                onChangeText={text=>textChangeHandler(text)}
                onBlur={focusChangeHandler}
                style={styles.input}/>
            {!inputState.isValid && inputState.touched && <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
                }
        </View>
    );
};
 
const styles = StyleSheet.create({
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:"#ccc",
        borderBottomWidth:1
    },
    label:{
        fontFamily:"open-sans-bold"
    },
    formControl:{
        width:"100%",
        margin:15
    },
    errorText:{
        color:"red",
        fontFamily:"open-sans",
        fontSize:14
    },
    errorContainer:{
        marginVertical:5

    } 
});

export default Input;