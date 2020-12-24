import React,{useReducer,useCallback} from "react";
import {KeyboardAvoidingView,View,Alert,Text,StyleSheet,Button,ActivityIndicator} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useDispatch} from "react-redux";

import colours from "../../constants/colours";
import Input from "../../components/UI/Input";
import {signup,login} from "../../store/actions/auth";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props =>{

    const [isSignup,setIsSignup] = React.useState(false)
    const [error,setError] = React.useState();
    const [isLoading,setIsLoading] = React.useState(false)
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          email: '',
          password: ''
        },
        inputValidities: {
          email: false,
          password: false
        },
        formIsValid: false
      });
    
      const signupHandler = async() => {
          setError(null);
          setIsLoading(true);
          try{
              let action;
              if(isSignup){
                action=signup(
                        formState.inputValues.email,
                        formState.inputValues.password
                    )

              }
              else{
                action = login(
                    formState.inputValues.email,
                    formState.inputValues.password
                )
                  
            }
            await dispatch(action)
            props.navigation.navigate("shop")
            
            
          }catch(err){
              console.log(err.message)
              setError(err.message)
              setIsLoading(false)
          }
          
      };
    
      const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );

      React.useEffect(()=>{
          if(error){
              Alert.alert(error)
          }
      },[error])
    return(
        <KeyboardAvoidingView style={styles.screen} behaviour="padding" keyboardVerticalOffset={100}>
            {/* <LinearGradient style={styles.gradient}colors={[colours.tertiary,colours.quarternary]}> */}
        <View style={styles.card}>
            <View>
                <Input
                    label="email"
                    required
                    id="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    errorText="please enter a valid email address"
                    email
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
                <Input
                    label="password"
                    id="password"
                    required
                    errorText="please enter a valid password"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    secureTextEntry
                    autoCapitalize="none"
                    minLength={5}
                />


                <View style={styles.buttonContainer}>
                    {isLoading?
                    <View><ActivityIndicator color={colours.primary} size="large"/></View>
                    :
                    <Button color={colours.primary} title={isSignup?"sign up":"login"} onPress={signupHandler}/>}
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={colours.secondary} title={isSignup?"switch to login":"switch to signup"} onPress={()=>setIsSignup(prevState=>!prevState)}/>
                </View>

            </View>
        </View>
        {/* </LinearGradient> */}
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
        
    },
    // gradient:{
    //     flex:1,
    //     justifyContent:"center",
    //     alignItems:"center"
        
    // },
    card:{
        shadowColor:"black",
        shadowRadius:10,
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.5,
        width:"80%",
        maxWidth:400,
        //height:"50%",
        maxHeight:400,
        // margin:10,
        backgroundColor:colours.tertiary,
        borderRadius:15,
        padding:30,
        elevation:10
    },
    buttonContainer:{
        marginTop:10
    }
});

export default AuthScreen;