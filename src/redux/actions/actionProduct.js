import axios from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { setProduct, getProduct,addProduct } from '../reducers/ProductReducer';
function* workerGetProduct() {

    try {
        const { data } = yield call(fetchProduct);
        yield put(setProduct(data));
 

    } catch (error) {
        console.log(error);

    }
}



async function fetchProduct() {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/product?limit=25`);
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

    try {
        // const data  = yield call(addNewProduct, action.payload);
      
       
        yield put(addProduct(action.payload));
    
 
    } catch (error) {
        console.log(error);

    }
}
// async function addNewProduct(data) {
// console.log('data',data)

//     try {
//         const token = localStorage.getItem('access_token');
//         const response = await axios.post(`http://localhost:4000/api/v1/product/add` ,data, {
//             headers: {
//                 'Content-Type': 'multipart/form-data', 
//                 Authorization: `Bearer ${token}`,
//             },
          
       
//         });
//         console.log('response',response)
//         return response.data.data;
//     } catch (error) {
//         console.log('error',error)
//         return [];
//     }
// }
