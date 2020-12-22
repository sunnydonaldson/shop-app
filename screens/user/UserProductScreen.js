import React from "react";
import {FlatList,Button,Alert} from "react-native";
import ListItem from "../../components/ListItem";
import {useSelector,useDispatch} from "react-redux";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import colours from "../../constants/colours";
import {deleteProduct} from "../../store/actions/products";

const UserProductScreen = props =>{
    const userProducts= useSelector(state=> state.products.userProducts);

    const clickHandler= (prodId)=>{
        props.navigation.navigate("editUserProducts",{prodId:prodId});
    }

    const deleteHandler= (itemData)=>{
        Alert.alert("delete item?","Are you sure you really want to delete this?",[
            {text:"no",style:"default"},
            {text:"yes",style:"destructive",onPress:()=>dispatch(deleteProduct(itemData.item.id))}
        ])
    }
    const dispatch = useDispatch();
    return(
        <FlatList data={userProducts} renderItem={itemData =>
        <ListItem onSelect={()=>clickHandler(itemData.item.id)} image={itemData.item.imageURL} label={itemData.item.title}price={itemData.item.price}>
            <Button title="edit" color={colours.primary} onPress={()=>clickHandler(itemData.item.id)}/>
            <Button title="remove" color={colours.secondary} onPress={()=>deleteHandler(itemData)}/>
        </ListItem>}/>
    )
}

UserProductScreen.navigationOptions = navigationData =>{
    return{
        headerLeft:()=>{
            return(
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="menu" iconName="ios-menu" onPress={()=>navigationData.navigation.toggleDrawer()}/>
                </HeaderButtons>
            )
        },
        headerRight:()=>{
            return(
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName="ios-create" onPress={()=>navigationData.navigation.navigate("editUserProducts")} title="add"/>

                </HeaderButtons>
            )
        }

    }
}

export default UserProductScreen;