import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  registerUserSuccess,
  registerUserFailure,
  registerUserStart,
} from '../slices/userSlice';

interface RegisterUserPayload {
  username: string;
  password: string;
}

function* registerUser(action: PayloadAction<RegisterUserPayload>) {
  try {
    yield put(registerUserSuccess({username: '', password: ''}));
  } catch (error: any) {
    yield put(registerUserFailure(error.response?.data || error.message));
  }
}

function* userSaga() {
  yield takeLatest(registerUserStart.type, registerUser);
}

export default userSaga;
