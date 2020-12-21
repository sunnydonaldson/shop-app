import React from "react";
import {Text,View,ScrollView,TextInput,StyleSheet} from "react-native";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import * as productActions from "../../store/actions/products";

const EditProductScreen = props =>{
    const productKey = props.navigation.getParam("prodId")
    const editedProduct = useSelector(state => state.products.userProducts.find(product=>product.id === productKey));

    //the ternary operator used on "editProduct" checks to see if it contains a value
    //it returns true if it does, and false if it doesn't
    // it's the same for !editedProduct && <View> below,
    //if editedProduct contains a value it doesn't get rendered, else it does.
    //this makes sure that there's no input for users to edit the price of their products
    const[title,setTitle] = React.useState(editedProduct? editedProduct.title:"")
    const[price,setPrice] = React.useState("")
    const[url,setUrl] = React.useState(editedProduct?editedProduct.imageURL:"")
    const[description,setDescription] = React.useState(editedProduct?editedProduct.description:"")

    const dispatch = useDispatch();

    const submitHandler= React.useCallback(()=>{
        if(editedProduct){
            dispatch(productActions.updateProduct(productKey,title,price,url,description))
        }else{
            dispatch(productActions.createProduct(title,+price,url,description))
        }
    },[]);

    React.useEffect(()=>{
        props.navigation.setParams({onSubmit:submitHandler})
    },[submitHandler])


    return(
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>title</Text>
                    <TextInput value={title} onChangeText={text=>setTitle(text)} style={styles.input}/>
                </View>
                {!editedProduct && <View style={styles.formControl}>
                    <Text style={styles.label}>price</Text>
                    <TextInput value={price} onChangeText={text=>setPrice(text)}style={styles.input}/>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>image URL</Text>
                    <TextInput value={url} onChangeText={text=>setUrl(text)} style={styles.input}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>description</Text>
                    <TextInput value={description} onChangeText={text=>setDescription(text)} style={styles.input}/>
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navigationData=>{
    const submitHandler = navigationData.navigation.getParam("onSubmit")
    return{
        headerRight:()=>{
            return(
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName="md-checkmark" title="save" onPress={submitHandler}/>
                </HeaderButtons>
            )
        },
        headerTitle:navigationData.navigation.getParam("prodId")?"edit product":"add product"

    }
}

const styles = StyleSheet.create({
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:"#ccc",
        borderBottomWidth:1
    },
    label:{
        fontFamily:"open-sans-bold"
    },
    formControl:{
        width:"100%"
    },
    form:{
        margin:20
    },

})

export default EditProductScreen;