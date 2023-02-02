import axios from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { setCategory, getCategory, addCategory, updateCategory, categoryDeleted } from '../reducers/CategoryReducer';
function* workerGetCategory() {
    try {
        const { data } = yield call(fetchCategory);
        yield put(setCategory(data));

    } catch (error) {
        console.log(error);

    }
}
async function fetchCategory() {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/category`);
        return response.data;
    } catch (error) {
        return [];
    }

}
export function* actionCategory() {
    yield takeLeading(getCategory.type, workerGetCategory);

    yield takeLeading(addCategory.type, workerAddCategory);
    yield takeLeading(updateCategory.type, workerUpdateCategory);
    yield takeLeading(categoryDeleted.type, workerDeleteCategory);

}


function* workerAddCategory(action) {

    try {
        const { data } = yield call(addNewCatgory, action.payload);
        yield put(addCategory(data));


    } catch (error) {
        console.log(error);

    }
}
async function addNewCatgory(data) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post(`http://localhost:4000/api/v1/category/add`, data, {
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

function* workerUpdateCategory(action) {

    try {
        const { data } = yield call(updateCatgory, action.payload);
        yield put(updateCategory(data));
        // yield put({ type: ACTION.SET_LOADING, payload: false });
        // yield put({ type: 'SET_HIT', payload: allPRODUCT });

    } catch (error) {
        console.log(error);

    }
}

async function updateCatgory(data) {

    try {

        const token = localStorage.getItem('access_token');
        const response = await axios.put(`http://localhost:4000/api/v1/category/edit/${data.id}`, data, {
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

function* workerDeleteCategory(action) {

    try {
        const { data } = yield call(deleteCatgory, action.payload);
        yield put(getCategory());

    } catch (error) {
        console.log(error);

    }
}

async function deleteCatgory(data) {


    try {

        const token = localStorage.getItem('access_token');
        const response = await axios.delete(`http://localhost:4000/api/v1/category/delete/${data}`, {
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




