import React from "react";
import {Button,Text,View,FlatList,StyleSheet} from "react-native";
import {useSelector,useDispatch} from "react-redux";
import ListItem from "../../components/ListItem";
import * as actions from "../../store/actions/cart";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { DrawerActions } from "react-navigation-drawer";
import colours from "../../constants/colours";

const ProductOverviewScreen = props =>{
    const dispatch = useDispatch();
    const products = useSelector(state=>state.products.availableProducts)

    const selectItemHandler = (itemID,itemTitle) =>{
        props.navigation.navigate("productDetail",{productID:itemID,productTitle:itemTitle})
    }
    return(
        <View>
        <FlatList data={products} renderItem={itemData =>
             <ListItem onSelect={()=>selectItemHandler(itemData.item.id,itemData.item.title)} label={itemData.item.title} image={itemData.item.imageURL} price={itemData.item.price}>
                <Button color={colours.primary}title="add to cart" onPress={()=>{dispatch(actions.addToCart(itemData.item))}}/>
                <Button color={colours.secondary}title="view item" onPress={() => selectItemHandler(itemData.item.id,itemData.item.title)}/>
             </ListItem>}/>
        </View>
    )
}

ProductOverviewScreen.navigationOptions = navigationData =>{
    return{
    headerRight:()=><HeaderButtons HeaderButtonComponent={CustomHeaderButton}><Item title="cart" iconName="ios-cart" onPress={()=>navigationData.navigation.navigate({routeName:"cart"})}/></HeaderButtons>,
    headerLeft:()=>{
        return(
            <HeaderButtons  HeaderButtonComponent={CustomHeaderButton}>
                <Item title="menu" iconName="ios-menu" onPress={()=>navigationData.navigation.toggleDrawer()}/>
            </HeaderButtons>
        )
    }
    }
}




export default ProductOverviewScreen;
