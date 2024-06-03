// rootReducer.ts
import { combineReducers } from 'redux';
import chatReducer from '../features/chat/chatSlice';

const rootReducer = combineReducers({
  chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
