import React from "react";
import {ActivityIndicator,View,Text,StyleSheet,AsyncStorage} from "react-native"
import colours from "../constants/colours";
import {useDispatch} from "react-redux";
import {loginFromStorage} from "../store/actions/auth";

const StartupScreen= props =>{
    const dispatch= useDispatch()
    React.useEffect(()=>{
        const tryLogin = async ()=>{
            try{
                const userData = await AsyncStorage.getItem("userData");
                if(!userData){
                    props.navigation.navigate("auth")
                    return;
                }
                const transformedData = JSON.parse(userData);
                const {token,userId,expirationDate} = transformedData;
                const expiryDate = new Date(expirationDate);
                if(expiryDate <= new Date() || !token || !userId){
                    props.navigation.navigate("auth")
                    return;
                }
                dispatch(loginFromStorage(token,userId))
                props.navigation.navigate("shop")
 
            }catch(err){
                console.log(err)

            }
            

        }
        tryLogin()

    },[])


    return(
        <View style={styles.screen}>
            <ActivityIndicator color={colours.primary} size="large"/>
        </View>
    )

}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})

export default StartupScreen;