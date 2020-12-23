import React from "react";
import {Button,Text,View,FlatList,StyleSheet,ActivityIndicator, Alert} from "react-native";
import {useSelector,useDispatch} from "react-redux";
import ListItem from "../../components/ListItem";
import * as actions from "../../store/actions/cart";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { DrawerActions } from "react-navigation-drawer";
import colours from "../../constants/colours";
import {fetchProducts} from  "../../store/actions/products";
import react from "react";
const ProductOverviewScreen = props =>{
    const [isLoading,setIsLoading] = React.useState(false)
    const [isRefreshing,setIsRefreshing] = React.useState(false)
    const [error,setError] = React.useState();
    const dispatch = useDispatch();
    const products = useSelector(state=>state.products.availableProducts)

    const loadProducts = React.useCallback(async ()=>{
        setError(null)
        setIsRefreshing(true);
        try{
            await dispatch(fetchProducts());

        }catch(err){
            setError(err.message)
        }
        
        setIsRefreshing(false);
    },[dispatch])
    
    
    React.useEffect(()=>{
        setIsLoading(true)
        loadProducts().then(()=>{
            setIsLoading(false)
        })
    },[dispatch,loadProducts])


    React.useEffect(()=>{
        const willFocus = props.navigation.addListener("willFocus",()=>{
            loadProducts();
        })
        //returns a cleanup function that gets rid of any uneccessary listeners
        return ()=>{
            willFocus.remove();

        }
    },[loadProducts])

    

    const selectItemHandler = (itemID,itemTitle) =>{
        props.navigation.navigate("productDetail",{productID:itemID,productTitle:itemTitle})
    }

    if(error){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>an error has occured</Text>
            <Button title="try again" onPress={()=>loadProducts()} color={colours.primary}/>
        </View> 
        )
    }


    if(isLoading){
        return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size="large" color={colours.primary}/>
        </View>
        )
    }

    if(!isLoading&&products.length===0){
        return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>no products found.</Text>
        </View>)
        
    }

    
    return(
        <View>
        <FlatList style={{width:"100%"}} data={products} refreshing={isRefreshing} onRefresh={loadProducts} renderItem={itemData =>
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
