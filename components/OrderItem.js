import React from "react";
import {View,Text,FlatList,StyleSheet,Button} from "react-native";
import CartItem from "./CartItem";
import colours from "../constants/colours";

const OrderItem = props =>{
    console.log(props.items[0].productQuantity)
    const [showDetails,setShowDetails] = React.useState(false);
    return(
        <View style={styles.card}>
            <View style={styles.summary}>
                <Text style={styles.amount}>£{props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
            color={colours.primary} 
            title={showDetails?"hide details":"show details"}
            onPress={()=>{
                setShowDetails(previousState=> !previousState);

            }}/>
            {showDetails &&<View>
                {props.items.map(item=><CartItem key={item.productId} qty={item.productQuantity} productData={item}/>)}

            </View>}
        </View>
    )

}

const styles = StyleSheet.create({
    card:{
        width:"80%",
        backgroundColor:colours.tertiary,
        justifyContent:"space-around",
        alignItems:"center",
        borderRadius:15,
        shadowRadius:15,
        shadowOffset:{width:0,height:2},
        shadowColor:"black",
        shadowOpacity:0.26,
        elevation:10,
        margin:20,
        padding:10
    },
    summary:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"100%",
        alignItems:"center",
        marginBottom:10
    },
    amount:{
        fontFamily:"open-sans-bold",
        fontSize:16
    },
    date:{
        fontFamily:"open-sans",
        fontSize:16,
        color:"#888"
    }
})

export default OrderItem;