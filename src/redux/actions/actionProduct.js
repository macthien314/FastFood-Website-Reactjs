import axios from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { setProduct, getProduct, addProduct, updateProduct, productDeleted } from '../reducers/ProductReducer';
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
// async function addNewProduct(data) {
// console.log('data',data)

//     try {
//         const token = localStorage.getItem('access_token');
//         const response = await axios.post(`https://fastfood314.up.railway.app/api/v1/product/add` ,data, {
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

function* workerUpdateProduct(action) {
    try {
        // const { data } = yield call(fetchUpdateProduct, action.payload);
        yield put(updateProduct(action.payload));
        // yield put({ type: ACTION.SET_LOADING, payload: false });
        // yield put({ type: 'SET_HIT', payload: allPRODUCT });

    } catch (error) {
        console.log(error);

    }
}

// async function fetchUpdateProduct(data) {
//     try {
//         const token = localStorage.getItem('access_token');
//         const response = await axios.put(`https://fastfood314.up.railway.app/api/v1/product/edit/${data.id}`, data, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             }
//         });
//         return response.data;
//     } catch (error) {
//         return [];
//     }
// }

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
