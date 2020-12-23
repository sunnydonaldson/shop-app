import React from "react";
import {KeyboardAvoidingView,View,Text,StyleSheet,Button} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import colours from "../../constants/colours";
import Input from "../../components/UI/Input";

const AuthScreen = props =>{
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
                    errorMessage="please enter a valid email address"
                    email
                    onInputChange={()=>{}}
                    initialValue=""
                />
                <Input
                    label="password"
                    id="password"
                    required
                    errorMessage="please enter a valid password"
                    onInputChange={()=>{}}
                    initialValue=""
                    secureTextEntry
                    autoCapitalize="none"
                    minLength={5}
                />


                <View style={styles.buttonContainer}>
                    <Button color={colours.primary} title="login" onPress={()=>{}}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={colours.secondary} title="switch to sign-up" onPress={()=>{}}/>
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