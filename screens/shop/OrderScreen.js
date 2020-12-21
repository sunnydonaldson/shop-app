import React from "react";
import {Text,StyleSheet,Image,View,FlatList} from "react-native";
import {useSelector} from "react-redux";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/OrderItem";

const OrderScreen = props =>{
    const orders = useSelector(state => state.orders.orders)

    return(
        <View style={{alignItems:"center"}}>
            <Text>test text</Text>
            <FlatList data={orders} contentContainerStyle={{width:"100%"}} renderItem={itemData => <OrderItem items={itemData.item.items} date={itemData.item.readableDate} amount={itemData.item.cost}/>}/>
        </View>
    )
}

OrderScreen.navigationOptions = navigationData =>{
    return{
        headerLeft:()=>{
            return(
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="menu button" iconName="ios-menu" onPress={()=>navigationData.navigation.toggleDrawer()}/>
                </HeaderButtons>
            )
        }
    }
}

export default OrderScreen;