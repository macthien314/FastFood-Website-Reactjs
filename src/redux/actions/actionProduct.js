import axios from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { setProduct,getProduct,sortProduct } from '../reducers/ProductReducer';
function* workerGetProduct(action) {
    try {
        const {data} = yield call(fetchProduct);
        yield put(setProduct(data));
        // yield put({ type: ACTION.SET_LOADING, payload: false });
        // yield put({ type: 'SET_HIT', payload: allPRODUCT });

    } catch (error) {
        console.log(error);

    }
}
async function fetchProduct() {
    try {
        const response = await axios.get(`https://fastfood314.up.railway.app/api/v1/product?limit=13`);
        return response.data;
    } catch (error) {
        return [];
    }
}

function* workerSortProduct(action) {
    try {
        const {data} = yield call(fetchSortProduct);
        yield put(setProduct(data));
        // yield put({ type: ACTION.SET_LOADING, payload: false });
        // yield put({ type: 'SET_HIT', payload: allPRODUCT });

    } catch (error) {
        console.log(error);

    }
}

async function fetchSortProduct() {
    try {
        const response = await axios.get(`https://fastfood314.up.railway.app/api/v1/product?limit=13&sort=price`);
        return response.data;
    } catch (error) {
        return [];
    }
}

// async function getProduct() {
//     return axios.request({
//         method:"GET",
//         url:`https://fastfood314.up.railway.app/api/v1/product`
//     })
// }
export function* actionGetProduct() {
    yield takeLeading(getProduct.type, workerGetProduct);
    yield takeLeading(sortProduct.type, workerSortProduct);
    // yield takeLatest(ACTION.ADD_PRODUCT, workerAddPRODUCT);
    // yield takeLatest(ACTION.MODIFY_PRODUCT, workerModifyPRODUCT);
    // yield takeLatest(ACTION.REMOVE_PRODUCT, workerRemovePRODUCT);
}
