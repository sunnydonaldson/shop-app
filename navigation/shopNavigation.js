import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createTabNavigator} from "react-navigation-tabs";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import {Platform} from "react-native";
import colours from "../constants/colours";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

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
    productOverview:{
        screen:ProductOverviewScreen,
        navigationOptions:{
            headerTitle:"products",
            headerStyle:{
                shadowColor:"black",
                shadowOffset:{width:0,height:2},
                shadowOpacity:0.3,
                shadowRadius:15
            }
        }
    },
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
    userProducts:{
        screen:UserProductScreen,
        navigationOptions:{
            headerTitle:"my products"
        }
    },
    editUserProducts:EditProductScreen
},
{
    
    navigationOptions:{
        drawerIcon:drawerConfig=> <Ionicons name="ios-pricetag" color={drawerConfig.tintColor} size={23}/>,
        title:"my products"
    },
    defaultNavigationOptions:navOptions

}
)

const navigationDrawer = createDrawerNavigator({
    shop:{screen:shopNavigator,navigationOptions:{title:"shop"}},
    orders:orderNavigator,
    userProducts:userProductsNavigator
},
{
    contentOptions:{
        activeTintColor:colours.primary,
        //fontFamily:"open-sans-bold",
    },
    
})

const authNavigator = createStackNavigator({
    auth:AuthScreen
})

const mainNavigator = createSwitchNavigator({
    auth:authNavigator,
    shop:navigationDrawer

})

export default createAppContainer(mainNavigator);