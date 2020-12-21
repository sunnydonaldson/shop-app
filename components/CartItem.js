import React from "react";
import {Text,View,StyleSheet,TouchableOpacity,TouchableNativeFeedback,Platform} from "react-native";
import colours from "../constants/colours";
import {Ionicons} from "@expo/vector-icons"

const TouchableComponent = Platform.OS === "android" && Platform.Version >=21?TouchableNativeFeedback:TouchableOpacity


const CartItem = props =>{
    return(
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.qty}</Text>
                <Text style={styles.title} numberOfLines={1}>{props.productData.productTitle}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.price}>{props.productData.productSum.toFixed(2)}</Text>
                {props.deletable && <TouchableNativeFeedback onPress={props.onRemove}>
                    <View>
                        <Ionicons size={23} color={colours.primary} name={Platform.OS == "android"?"md-trash":"ios-trash"}/>
                    </View>
                </TouchableNativeFeedback>}
            </View>
        </View>
    );
};

styles= StyleSheet.create({
    cartItem:{
        alignItems:"center",
        justifyContent:"space-between",
        padding:10,
        flexDirection:"row",
    },
    itemData:{
        margin:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
         
    },
    title:{
        fontSize:20,
        fontFamily:"open-sans-bold",
        color:colours.primary,
    },
    price:{
        fontSize:15,
        fontFamily:"open-sans-bold"
    },
    quantity:{
        fontSize:15,
        fontFamily:"open-sans-bold",
        color:"#ccc",
        paddingRight:10
    },

})

export default CartItem;