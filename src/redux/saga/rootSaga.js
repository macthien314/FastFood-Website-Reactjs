import { all } from 'redux-saga/effects';
import  {actionGetProduct}  from '../actions/actionProduct';
import  {actionCategory}  from '../actions/actionCategory';


export default function* rootSaga() {
    yield all([
        actionGetProduct(),
        actionCategory(),
        // actionUser(),
        // actionComment(),
    ]);
}