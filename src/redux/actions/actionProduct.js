import axios from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { setProduct, getProduct, addProduct, updateProduct, productDeleted, countProduct } from '../reducers/ProductReducer';
function* workerGetProduct() {

    try {
        const  response  = yield call(fetchProduct);
        yield put(setProduct(response.data));
        yield put(countProduct(response.count));


    } catch (error) {
        console.log(error);

    }
}



async function fetchProduct() {
    try {
        const response = await axios.get(`https://fastfood314.up.railway.app/api/v1/product`);
        return response.data;
    } catch (error) {
        return [];
    }
}

export function* actionGetProduct() {
    yield takeLeading(getProduct.type, workerGetProduct);

    yield takeLeading(addProduct.type, workerAddProduct);
    yield takeLeading(updateProduct.type, workerUpdateProduct);
    yield takeLeading(productDeleted.type, workerDeleteProduct);
}


function* workerAddProduct(action) {

    try {
        // const data  = yield call(addNewProduct, action.payload);
        yield put(addProduct(action.payload));
       

    } catch (error) {
        console.log(error);

    }
}


function* workerUpdateProduct(action) {
    try {
        yield put(updateProduct(action.payload));
       

    } catch (error) {
        console.log(error);

    }
}



function* workerDeleteProduct(action) {
   

    try {
        yield call(fetchDeleteProduct, action.payload);
        yield put(getProduct());

    } catch (error) {
        console.log(error);

    }
}

async function fetchDeleteProduct(data) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.delete(`https://fastfood314.up.railway.app/api/v1/product/delete/${data}`, {
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
