import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../../store/shopping-cart/cartSlice";
import cartUiSlice from "../../store/shopping-cart/cartUiSlice";
import logger from "redux-logger"


import productSlice from './ProductReducer';
import categorySlice from './CategoryReducer';


import {applyMiddleware, createStore, combineReducers } from 'redux';
import rootSaga from '../saga/rootSaga';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  //reducer khai báo tại đây
    product: productSlice,
    category: categorySlice,
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,

})

const store = configureStore(
  {
    reducer, 
    middleware:(gDM) => gDM().concat (logger,sagaMiddleware)
  });



//gọi saga
sagaMiddleware.run(rootSaga);
export default store;