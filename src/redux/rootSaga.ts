import { all } from 'redux-saga/effects';
import chatSaga from '../saga/chatSaga';

export default function* rootSaga() {
  yield all([chatSaga()]);
}
