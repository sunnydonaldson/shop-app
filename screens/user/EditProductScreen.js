 import React,{useReducer} from "react";
import {Text,View,ScrollView,TextInput,StyleSheet,Alert,KeyboardAvoidingView} from "react-native";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import * as productActions from "../../store/actions/products";

import Input from "../../components/UI/Input";
import { useCallback } from "react";

const UPDATE = "UPDATE"

const formReducer = (state,action)=>{
    if(action.type ===UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.inputId]:action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.inputId]:action.isValid
        }
        let formIsValid = true;
        for(const key in updatedValidities){
            //if either side of the boolean operator is false, it retur ns false
           formIsValid = formIsValid && updatedValidities[key];
        }
        return{
            inputValues:updatedValues,
            inputValidities:updatedValidities,
            formIsValid:formIsValid 
        }
    }
}

const EditProductScreen = props =>{
    const productKey = props.navigation.getParam("prodId")
    const editedProduct = useSelector(state => state.products.userProducts.find(product=>product.id === productKey));

    //the ternary operator used on "editProduct" checks to see if it contains a value
    //it returns true if it does, and false if it doesn't
    // it's the same for !editedProduct && <View> below,
    //if editedProduct contains a value it doesn't get rendered, else it does.
    //this makes sure that there's no input for users to edit the price of their products

    const dispatch = useDispatch();

    const [formState,dispatchFormState] = useReducer(formReducer,{
        //setting the default values
        inputValues:{
            title:editedProduct?editedProduct.title:"",
            price:"",
            url:editedProduct?editedProduct.imageURL:"",
            description:editedProduct?editedProduct.description:" "
        },
        inputValidities:{
            //if editedProduct has a value, then it must be correct from the start
            title:editedProduct?true:false,
            price:editedProduct?true:false,
            url:editedProduct?true:false,
            description:editedProduct?true:false, 

        },
        formIsValid:editedProduct?true:false 
    })

    const inputChangeHandler = useCallback((inputIdentifier,inputValue,isValid) =>{
        
        dispatchFormState({type:UPDATE,isValid:isValid,value:inputValue,inputId:inputIdentifier})
    },[dispatchFormState ])
 
 
    

    const submitHandler= React.useCallback(()=>{
        if(!formState.formIsValid){
            Alert.alert("invalid entry","make sure you fill out all fields with appropriate information",[
                {text:"okay"}
                
            ])
            return;
        }
        if(editedProduct){
            dispatch(productActions.updateProduct(productKey,formState.inputValues.title,formState.inputValues.url,formState.inputValues.description))
        }else{
            dispatch(productActions.createProduct(formState.inputValues.title,+formState.inputValues.price,formState.inputValues.url,formState.inputValues.description))
        }
        props.navigation.goBack()
    },[formState,dispatch]);

    React.useEffect(()=>{
        props.navigation.setParams({onSubmit:submitHandler})
    },[submitHandler])


    return(
        <KeyboardAvoidingView behaviour="padding" keyboardVerticalOffset={100} style={{flex:1}}>
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id="title"
                    initialValue={editedProduct?editedProduct.title:""}
                    isValid={editedProduct?true:false}
                    label="title" errorText="please enter a title"
                    onInputChange={inputChangeHandler}
                    autoCapitalize="words"
                    returnKeyType="next"
                    required
                />

                {!editedProduct && <Input 
                    id="price"
                    initialValue="" 
                    isValid={editedProduct?true:false}
                    label="price"
                    errorText="please enter a valid price"
                    returnKeyType="next"
                    keyboardType="decimal-pad"
                    onInputChange={inputChangeHandler}
                    required
                    min={0}
                />}

                <Input 
                    id="url"
                    initialValue={editedProduct?editedProduct.imageURL:""}
                    isValid={editedProduct?true:false}
                    label="image url" errorText="please enter a valid url"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onInputChange={inputChangeHandler}
                    required
                />
                <Input
                    id="description"
                    initialValue={editedProduct?editedProduct.description:""}
                    isValid={editedProduct?true:false}
                    label=" description"
                    errorText="please enter a valid description" 
                    multiline numberOfLines={3}
                    onInputChange={inputChangeHandler}
                    required
                />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

EditProductScreen.navigationOptions = navigationData=>{
    const submitHandler = navigationData.navigation.getParam("onSubmit")
    return{
        headerRight:()=>{
            return(
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName="md-checkmark" title="save" onPress={submitHandler}/>
                </HeaderButtons>
            )
        },
        headerTitle:navigationData.navigation.getParam("prodId")?"edit product":"add product"

    }
}

const styles = StyleSheet.create({
    form:{
        margin:20
    },

})

export default EditProductScreen;