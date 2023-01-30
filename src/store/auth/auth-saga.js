// import { takeLatest } from "redux-saga/effects";
// import handleAuthRegister, {
//   handleAuthLogin,
//   handleAuthLogOut,
//   handleAuthRefreshToken,
// } from "./auth-handlers";
// import {
//   authLogin,
//   authLogOut,
//   authRefreshToken,
//   authRegister,
// } from "./auth-slice";
// export default function* authSaga() {
//   yield takeLatest(authRegister.type, handleAuthRegister);
//   yield takeLatest(authLogin.type, handleAuthLogin);
//   yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
//   yield takeLatest(authLogOut.type, handleAuthLogOut);
// }
import axios from 'axios';
import { call, delay, put, takeLeading } from "redux-saga/effects";
import {  loginFail, loginSuccess, logout,registerSuccess } from "../../redux/reducers/authReducer";



function* handleLogin(action) {

  try {
    const response = yield call(fetchAuth, action.payload);



    localStorage.setItem('access_token', response.token)

    const data = yield call(fetchUser,response.token);
    yield put(loginSuccess(data.user));


  } catch (error) {
    console.log(error)
    yield put(loginFail({

    }))
  }

}

async function fetchAuth(data) {

  try {
    const axiosClient = axios.create({
      baseURL: "https://fastfood314.up.railway.app/api/v1",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
    const responses = await axiosClient.post(`/auth/login`, data);

    return responses.data;
  } catch (error) {
    return [];
  }
}
function* handleLogout(payload) {
  yield delay(500)
  
  localStorage.removeItem('access_token');

}




async function fetchUser(token) {
  if (!token) return;

  try {
    const response = await axios.get(`https://fastfood314.up.railway.app/api/v1/auth/me`, {
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


function* handleRegister(action) {

  try {
    const response = yield call(fetchRegister, action.payload);
    yield put(registerSuccess(response));

   
 

  } catch (error) {
    yield put(loginFail({

    }))
  }

}

async function fetchRegister(data) {

  try {
    const axiosClient = axios.create({
      baseURL: "https://fastfood314.up.railway.app/api/v1",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
    const responses = await axiosClient.post(`/auth/register`, data);

    return responses.data;
  } catch (error) {
    return [];
  }
}

export default function* authSaga() {
  yield takeLeading(loginSuccess.type, handleLogin)
  yield takeLeading(logout.type, handleLogout)
  yield takeLeading(registerSuccess.type, handleRegister)
}
