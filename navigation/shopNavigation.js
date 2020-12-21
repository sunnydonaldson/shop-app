import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createTabNavigator} from "react-navigation-tabs";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import {createAppContainer} from "react-navigation";
import {Platform} from "react-native";
import colours from "../constants/colours";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const navOptions = {
    headerStyle:{
        backgroundColor:Platform.OS === "android"?colours.primary:colours.tertiary
    },
    headerTintColor:Platform.OS ==="android"?colours.tertiary:colours.primary,
    headerTitleStyle:{
        fontFamily:"open-sans-bold"
    },
    headerBackTitleStyle:{
        fontFamily:"open-sans"
    },
}



const shopNavigator = createStackNavigator({
    productOverview:ProductOverviewScreen,
    productDetail:ProductDetailScreen,
    cart:CartScreen
},
{
    navigationOptions:{
        drawerIcon:drawerConfig =><Ionicons name="ios-cart" size={23} color={drawerConfig.tintColor}/>

    },
    defaultNavigationOptions:navOptions
    
})

const orderNavigator = createStackNavigator({
    orders:OrderScreen
},
{
    navigationOptions:{
        drawerIcon: drawerConfig=> <Ionicons name="ios-list" color={drawerConfig.tintColor} size={23}/>

    },
    defaultNavigationOptions:navOptions
    
}

)

const userProductsNavigator = createStackNavigator({
    userProducts:UserProductScreen,
    editUserProducts:EditProductScreen
},
{
    
    navigationOptions:{
        drawerIcon:drawerConfig=> <Ionicons name="ios-pricetag" color={drawerConfig.tintColor} size={23}/>
    },
    defaultNavigationOptions:navOptions

}
)

const navigationDrawer = createDrawerNavigator({
    shop:shopNavigator,
    orders:orderNavigator,
    userProducts:userProductsNavigator
},{contentOptions:{
    activeTintColor:colours.primary
}})

export default createAppContainer(navigationDrawer);