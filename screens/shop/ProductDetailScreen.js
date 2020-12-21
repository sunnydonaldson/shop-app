import React from "react";
import {View,Image,Button,Text,StyleSheet,ScrollView} from "react-native";
import {useSelector,useDispatch} from "react-redux"
import colours from "../../constants/colours";
import * as actions from "../../store/actions/cart";



const ProductDetailScreen = props =>{
    const dispatch = useDispatch()
    const itemID = props.navigation.getParam("productID")
    const selectedItem = useSelector(state=> state.products.availableProducts.find(product => product.id == itemID))
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.image} source={{uri:selectedItem.imageURL}}/>
            <Button title="add to cart" color={colours.primary} onPress={()=>{dispatch(actions.addToCart(selectedItem))}}/>
            <Text style={styles.price}>£{selectedItem.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedItem.description}</Text>
            
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navigationData =>{
    return{
        headerTitle:navigationData.navigation.getParam("productTitle")
    }
}
const styles = StyleSheet.create({
    container:{
        minHeight:"100%",
        justifyContent:"flex-start",
        alignItems:"center",
        backgroundColor:colours.tertiary
    },
    image:{
        width:"100%",
        height:300,
        marginBottom:30

    },
    price:{
        fontSize:20,
        color:colours.secondary,
        marginVertical:30,
        fontFamily:"open-sans-bold"
    },
    description:{
        fontSize:14,
        marginHorizontal:20,
        fontFamily:"open-sans"

    }
})
export default ProductDetailScreen;