import {all} from 'redux-saga/effects';
import chatSaga from '../saga/chatSaga';
import userSaga from '../saga/userSaga';

export default function* rootSaga() {
  yield all([chatSaga(), userSaga()]);
}
