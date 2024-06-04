// rootReducer.ts
import {combineReducers} from 'redux';
import chatReducer from '../slices/chatSlice';
import userReducer from '../slices/userSlice';

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
