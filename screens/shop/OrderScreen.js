import React from "react";
import {Text,StyleSheet,Image,View,FlatList,ActivityIndicator} from "react-native";
import {useSelector,useDispatch} from "react-redux";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/OrderItem";
import {setOrders} from "../../store/actions/orders";
import colours from "../../constants/colours";


const OrderScreen = props =>{
    const [isLoading,setIsLoading] = React.useState(false)
    const [error,setError] = React.useState()
    const orders = useSelector(state => state.orders.orders)


    React.useEffect(()=>{
        const willFocus = props.navigation.addListener("willFocus",()=>{loadOrders()})
        return ()=> {
            willFocus.remove();
        }
    },[loadOrders])

    React.useEffect(()=>{
        loadOrders();
    },[loadOrders,dispatch])

    const dispatch = useDispatch();

    const loadOrders = React.useCallback(async ()=>{
        setError(null)
        setIsLoading(true)
        try{
            await dispatch(setOrders())
            setIsLoading(false)
        }catch(err){
            setError(err.message)
        }

    })

    

    if(error){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>an error has occured:</Text>
            </View>
        )
    }
    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator color={colours.primary} size="large"/>

        </View>

        )
        
    }

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