import axios from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { addUser, updateUser, userDeleted } from '../reducers/UserReducer';
import { setUser, getUser } from '../reducers/UserReducer';
function* workerGetUser() {
    try {
        const { data } = yield call(fetchUser);
        yield put(setUser(data));

    } catch (error) {
        console.log(error);

    }
}
async function fetchUser() {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`https://fastfood314.up.railway.app/api/v1/users`, {
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
export function* actionUser() {
    yield takeLeading(getUser.type, workerGetUser);

    yield takeLeading(addUser.type, workerAddUser);
    yield takeLeading(updateUser.type, workerUpdateUser);
    yield takeLeading(userDeleted.type, workerDeleteUser);

}


function* workerAddUser(action) {

    try {
        const { data } = yield call(addNewUser, action.payload);
        console.log('data', data)

        yield put(addUser(data));


    } catch (error) {
        console.log(error);

    }
}
async function addNewUser(data) {
  
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post(`https://fastfood314.up.railway.app/api/v1/users/add`, data, {
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

function* workerUpdateUser(action) {
    console.log('workerUpdateUser', action)
    try {
        const { data } = yield call(updateUsers, action.payload);
        yield put(updateUser(data));
        // yield put({ type: ACTION.SET_LOADING, payload: false });
        // yield put({ type: 'SET_HIT', payload: allPRODUCT });

    } catch (error) {
        console.log(error);

    }
}

async function updateUsers(data) {
    try {

        const token = localStorage.getItem('access_token');
        const response = await axios.put(`https://fastfood314.up.railway.app/api/v1/users/edit/${data.id}`, data, {
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

function* workerDeleteUser(action) {

    try {
        yield call(deleteUsers, action.payload);
        yield put(getUser());

    } catch (error) {
        console.log(error);

    }
}

async function deleteUsers(data) {


    try {

        const token = localStorage.getItem('access_token');
        const response = await axios.delete(`https://fastfood314.up.railway.app/api/v1/users/delete/${data}`, {
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
