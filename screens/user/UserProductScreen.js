import React from "react";
import {FlatList,Button,Alert,ActivityIndicator,View} from "react-native";
import ListItem from "../../components/ListItem";
import {useSelector,useDispatch} from "react-redux";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import colours from "../../constants/colours";
import {deleteProduct} from "../../store/actions/products";

const UserProductScreen = props =>{
    const [isLoading,setIsLoading] = React.useState(false);
    const [error,setError] = React.useState();
    const userProducts= useSelector(state=> state.products.userProducts);

    const clickHandler= (prodId)=>{
        props.navigation.navigate("editUserProducts",{prodId:prodId});
    }

    const deleteHandler= (itemData)=>{
        Alert.alert("delete item?","Are you sure you really want to delete this?",[
            {text:"no",style:"default"},
            {text:"yes",style:"destructive",onPress:async()=>{
                setError(null)
                setIsLoading(true)
                try{
                    await dispatch(deleteProduct(itemData.item.id))
                }catch(err){
                    setError(err.message)
                }
                setIsLoading(false)
                }}
        ])
    }
    React.useEffect(()=>{
        if(error){
            Alert.alert("an error has occured",error,[{title:"okay"}])
        }
    },[error])
    const dispatch = useDispatch();

    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size="large" color={colours.primary}/>
            </View>
        )
    }
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