import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchConversations, fetchChatHistory } from '../api/chat';
import {
  fetchConversationsStart,
  fetchConversationsSuccess,
  fetchConversationsFailure,
  fetchChatHistoryStart,
  fetchChatHistorySuccess,
  fetchChatHistoryFailure,
} from '../slices/chatSlice';

function* fetchConversationsSaga():any {
  try {
    const conversations = yield call(fetchConversations);
    yield put(fetchConversationsSuccess(conversations));
  } catch (error:any) {
    yield put(fetchConversationsFailure(error.message));
  }
}

function* fetchChatHistorySaga(action: ReturnType<typeof fetchChatHistoryStart>):any {
  try {
    const messages = yield call(fetchChatHistory, action.payload);
    yield put(fetchChatHistorySuccess({ conversationId: action.payload, messages }));
  } catch (error:any) {
    yield put(fetchChatHistoryFailure(error.message));
  }
}

export default function* chatSaga() {
  yield takeLatest(fetchConversationsStart.type, fetchConversationsSaga);
  yield takeLatest(fetchChatHistoryStart.type, fetchChatHistorySaga);
}
