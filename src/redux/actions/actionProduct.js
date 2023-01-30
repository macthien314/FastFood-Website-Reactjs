import axios from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { setProduct, getProduct,addProduct } from '../reducers/ProductReducer';
function* workerGetProduct({payload, type}) {

    try {
        const { data } = yield call(fetchProduct);
        yield put(setProduct(data));
 

    } catch (error) {
        console.log(error);

    }
}



async function fetchProduct() {
    try {
        const response = await axios.get(`https://fastfood314.up.railway.app/api/v1/product?limit=15`);
        return response.data;
    } catch (error) {
        return [];
    }
}

export function* actionGetProduct() {
    yield takeLeading(getProduct.type, workerGetProduct);
  
    yield takeLeading(addProduct.type, workerAddProduct);
  
}


function* workerAddProduct(action) {
console.log('action',action)
    try {
        const { data } = yield call(addNewProduct, action.payload);
        yield put(addProduct(data));
    

    } catch (error) {
        console.log(error);

    }
}
async function addNewProduct(data) {


    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post(`https://fastfood314.up.railway.app/api/v1/product/add` ,data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
}
