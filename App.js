import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {createStore,combineReducers,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import productReducer from "./store/reducers/products";
import ShopNavigation from "./navigation/shopNavigation";
import AppLoading from "expo-app-loading";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";

import * as Font from "expo-font"

const fetchFonts = ()=>{
  return(Font.loadAsync({
    "open-sans":require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold":require("./assets/fonts/OpenSans-Bold.ttf")
  }))
}

const rootReducer = combineReducers({
  products:productReducer,
  cart: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded,setFontLoaded] = useState(false);

  if(!fontLoaded){
    return(
      <AppLoading startAsync={fetchFonts} onError={error=>console.log(error)} onFinish={()=>setFontLoaded(true)}/>
    )

  }

  return (
    <Provider store={store}>
      <ShopNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
