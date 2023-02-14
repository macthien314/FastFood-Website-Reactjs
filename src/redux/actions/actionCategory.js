// import axios from 'axios';
import { put, call, takeLeading } from "redux-saga/effects";
import axiosClient from "../../api/axios";
import {
  setCategory,
  getCategory,
  addCategory,
  updateCategory,
  categoryDeleted,
} from "../reducers/CategoryReducer";
function* workerGetCategory() {
  try {
    const data = yield call(fetchCategory);
    yield put(setCategory(data));
  } catch (error) {
    console.log(error);
  }
}
async function fetchCategory() {
  try {
    const response = await axiosClient.get(`/category`);
    return response;
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
    const data = yield call(addNewCatgory, action.payload);
    yield put(addCategory(data));
  } catch (error) {
    console.log(error);
  }
}
async function addNewCatgory(data) {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axiosClient.post(`/category/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return [];
  }
}

function* workerUpdateCategory(action) {
  try {
    const data = yield call(fetchUpdateCatgory, action.payload);
    yield put(updateCategory(data));
  } catch (error) {
    console.log(error);
  }
}

async function fetchUpdateCatgory(data) {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axiosClient.put(`/category/edit/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return [];
  }
}

function* workerDeleteCategory(action) {
  try {
    yield call(deleteCatgory, action.payload);
    yield put(getCategory());
  } catch (error) {
    console.log(error);
  }
}

async function deleteCatgory(data) {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axiosClient.delete(`/category/delete/${data}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}
