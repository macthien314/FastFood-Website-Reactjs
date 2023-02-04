import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../../store/shopping-cart/cartSlice";
import cartUiSlice from "../../store/shopping-cart/cartUiSlice";
import logger from "redux-logger"


import productSlice from './ProductReducer';
import categorySlice from './CategoryReducer';
import userSlice from './UserReducer';


import { applyMiddleware, createStore, combineReducers } from 'redux';
import rootSaga from '../saga/rootSaga';
import createSagaMiddleware from 'redux-saga';
import authReducer from "./authReducer";

// import authReducer from "../../store/auth/auth-slice";
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  //reducer khai báo tại đây
  product: productSlice,
  category: categorySlice,
  cart: cartSlice.reducer,
  user:userSlice,
  cartUi: cartUiSlice.reducer,
  auth: authReducer,

})

const store = configureStore(
  {
    reducer,
    middleware: (gDM) => gDM().concat( sagaMiddleware)
  });



//gọi saga
sagaMiddleware.run(rootSaga);
export default store;