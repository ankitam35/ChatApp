import {createSelector} from 'reselect';

const getChatState = (state: {chat: any}) => state.chat;

export const getChatHistory = createSelector(
  [getChatState],
  chat => chat.chatHistory,
);
