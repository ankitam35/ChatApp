import { createSelector } from 'reselect';

const getChatState = (state) => state.chat;

export const getChatHistory = createSelector(
  [getChatState],
  (chat) => chat.chatHistory
);
