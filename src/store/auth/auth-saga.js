import axios from "axios";
import { toast } from "react-toastify";
import { call, delay, put, takeLeading } from "redux-saga/effects";
import {
  login,
  loginFail,
  loginSuccess,
  logout,
  registerSuccess,forgotPassword, resetPassword
} from "../../redux/reducers/authReducer";
function* handleLogin(action) {

  try {
    const response = yield call(fetchAuth, action.payload);
    if(response.success === true){
      localStorage.setItem("access_token", response.token);

      const data = yield call(fetchUser, response.token);
      yield put(loginSuccess(data.user));
      toast.success('Đăng nhập thành công');
    }
    else{
      toast.error(response);
      yield put(loginFail(response));
    }
   
  } catch (error) {
    console.log('error',error);
   
  }
}

async function fetchAuth(data) {
  try {
    const axiosClient = axios.create({
      baseURL: "https://fastfood314.up.railway.app/api/v1",
    });
    const responses = await axiosClient.post(`/auth/login`, data);
    return responses.data;
  } catch (error) {

    return error.response.data.message;

  }
}
function* handleLogout(payload) {
  yield delay(500);

  localStorage.removeItem("access_token");
}

async function fetchUser(token) {
  if (!token) return;

  try {
    const response = await axios.get(
      `https://fastfood314.up.railway.app/api/v1/auth/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    yield put(loginFail({}));
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

function* handleForgotPassWord(action) {
  try {
    const response = yield call(fetchForgotPassWord, action.payload);
    if(response.success === true){
      toast.success(response.data)
    }
    
  } catch (error) {
    toast.error(error)
  }
}

async function fetchForgotPassWord(data) {
  try {
    const axiosClient = axios.create({
      baseURL: "https://fastfood314.up.railway.app/api/v1",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
    const responses = await axiosClient.post(`/auth/forgotPassword`, data);

    return responses.data;
  } catch (error) {
    return [];
  }
}

function* handleResetPassWord(action) {
  console.log('action.payload', action.payload)
  try {
    const response = yield call(fetchResetPassWord, action.payload);
    if(response.success === true){
      toast.success("Thay đổi mật khẩu thành công")

    }
    
  } catch (error) {
    toast.error(error)
  }
}

async function fetchResetPassWord(data) {
  console.log('data',data)
  try {
 
    const responses = await axios.post(`https://fastfood314.up.railway.app/api/v1/auth/resetPassword/${data.id}`, {
      password: data.password
    });
console.log('responses',responses)
    return responses.data;
  } catch (error) {
    return [];
  }
}

export default function* authSaga() {
  yield takeLeading(login.type, handleLogin);
  yield takeLeading(logout.type, handleLogout);
  yield takeLeading(registerSuccess.type, handleRegister);
  yield takeLeading(forgotPassword.type, handleForgotPassWord);
  yield takeLeading(resetPassword.type, handleResetPassWord);
}
