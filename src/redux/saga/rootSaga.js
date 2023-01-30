import { all } from 'redux-saga/effects';
import { actionGetProduct } from '../actions/actionProduct';
import { actionCategory } from '../actions/actionCategory';
import { actionUser } from '../actions/actionUser';
import authSaga from '../../store/auth/auth-saga';


export default function* rootSaga() {
    yield all([
        actionGetProduct(),
        actionCategory(),
        actionUser(),
        authSaga()
    ]);
}