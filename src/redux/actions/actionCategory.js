import axios from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';
import { setCategory, getCategory } from '../reducers/CategoryReducer';
function* workerGetCategory() {
    try {
        const {data} = yield call(fetchCategory);
        yield put(setCategory(data));
        // yield put({ type: ACTION.SET_LOADING, payload: false });
        // yield put({ type: 'SET_HIT', payload: allPRODUCT });

    } catch (error) {
        console.log(error);

    }
}
async function fetchCategory() {
    try {
        const response = await axios.get(`https://fastfood314.up.railway.app/api/v1/category`);
        return response.data;
    } catch (error) {
        return [];
    }

}
export function* actionCategory() {
    yield takeLeading(getCategory.type, workerGetCategory);
    // yield takeLatest(ACTION.ADD_PRODUCT, workerAddPRODUCT);
    // yield takeLatest(ACTION.MODIFY_PRODUCT, workerModifyPRODUCT);
    // yield takeLatest(ACTION.REMOVE_PRODUCT, workerRemovePRODUCT);
}
