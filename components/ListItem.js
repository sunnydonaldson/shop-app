import React from "react";
import {View,Text,StyleSheet,Image,Button,TouchableOpacity,Platform,TouchableNativeFeedback} from "react-native";
import colours from "../constants/colours";

const ListItem = props =>{
    const TouchableComponent = Platform.OS =="android" &&Platform.Version >=21  ?TouchableNativeFeedback:TouchableOpacity;
    return(
        <View style={{borderRadius:15,justifyContent:"center",alignItems:"center"}}>
        
        <TouchableComponent onPress={props.onSelect} useForeground>
            <View style={styles.card}>
            <Image style={styles.image} source={{uri:props.image}}/>
                <Text style={styles.title}>{props.label}</Text>
                <Text style={styles.price}>£{Math.round(props.price.toFixed(2)*100)/100}</Text>
                <View style={styles.actionButtons}>
                    {props.children}
                </View>
            </View>
        </TouchableComponent>
        </View>
    )
}

 const styles = StyleSheet.create({
    card:{
        justifyContent:"center",
        alignItems:"center",
        width:"85%",
        height:300,
        borderRadius:15,
        elevation:10,
        backgroundColor:colours.tertiary,
        margin:10,
        shadowColor:"black",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.26,
        shadowRadius:8,
        overflow:"hidden"
        
    },
    image:{
        width:"100%",
        height:"60%"
    },
    title:{
        fontSize:18,
        marginTop:4,
        marginBottom:2,
        fontFamily:"open-sans-bold"
    },
    price:{
        fontFamily:"open-sans"
    },
    actionButtons:{
        height:"25%",
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    }
})

export default ListItem;