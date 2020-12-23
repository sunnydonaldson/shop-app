import React from "react";
import {View,Text,StyleSheet,Button,ActivityIndicator, Alert} from "react-native";

import colours from "../../constants/colours";
import {useDispatch,useSelector} from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import CartItem from "../../components/CartItem";
import {removeFromCart} from "../../store/actions/cart";
import {newOrder} from "../../store/actions/orders";
import { useState } from "react";

const CartScreen = props =>{
    const [isLoading,setIsLoading] = React.useState(false);
    const [error,setError] = React.useState();
    const dispatch = useDispatch();

    const cartTotal = useSelector(state => state.cart.sum).toFixed(2);
    const cartItems = useSelector(state=>{
        const transformedItems=[];
        for (const key in state.cart.cartItems){
            transformedItems.push({
                productId:key,
                productTitle:state.cart.cartItems[key].title,
                productPrice:state.cart.cartItems[key].price,
                productQuantity:state.cart.cartItems[key].quantity,
                productSum:state.cart.cartItems[key].sum

            })
           
        }
        return transformedItems.sort((a,b)=> a.productId > b.productId?1:-1);
    });

    React.useEffect(()=>{
        if(error){
            Alert.alert("An error has occured",error,[{title:"okay"}])
        }
    },[error])

    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator color={colours.primary} size="large"/>
            </View>
        )
    }

    return(
    <View style={styles.screen}>
        <View style={styles.summary}>
            <Text>total: £{cartTotal}</Text>
            <Button onPress={async ()=>{
                setError(null)
                setIsLoading(true)
                try{
                    await dispatch(newOrder(cartItems,cartTotal))
                    setIsLoading(false)

                }catch(err){
                    setError(err.message)
                }
                
                }
                } disabled={cartItems.length == 0} color={colours.secondary} title="buy now"/>
        </View>
        <FlatList
            data={cartItems}
            keyExtractor={item=>item.productId}
            renderItem={itemData=>{
                return(
                    <CartItem
                        qty={itemData.item.productQuantity}
                        deletable={true}
                        productData ={itemData.item}
                        onRemove={()=>dispatch(removeFromCart(itemData.item.productId))}
                />)
            }}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        width:"100%"
    },
    summary:{
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius:15,
        flexDirection:"row",
        elevation:10,
        backgroundColor:colours.tertiary,
        margin:10,
        padding:10,
        shadowColor:"black",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.26,
        shadowRadius:8,
        overflow:"hidden"
    }
})

export default CartScreen;