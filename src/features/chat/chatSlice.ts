import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: number;
  sender: string;
  message: string;
}

interface Conversation {
  id: number;
  users: string[];
  lastMessage: string;
}

interface ChatState {
  conversations: Conversation[];
  chatHistory: { [key: number]: Message[] };
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  chatHistory: {},
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    fetchConversationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchConversationsSuccess(state, action: PayloadAction<Conversation[]>) {
      state.loading = false;
      state.conversations = action.payload;
    },
    fetchConversationsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchChatHistoryStart(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    fetchChatHistorySuccess(state, action: PayloadAction<{ conversationId: number, messages: Message[] }>) {
      state.loading = false;
      state.chatHistory[action.payload.conversationId] = action.payload.messages;
    },
    fetchChatHistoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage(state, action: PayloadAction<{ conversationId: number, message: Message }>) {
      state.chatHistory[action.payload.conversationId].unshift(action.payload.message);
      const conversation = state.conversations.find(convo => convo.id === action.payload.conversationId);
      if (conversation) {
        conversation.lastMessage = action.payload.message.message;
      }
    },
  },
});

export const {
  fetchConversationsStart,
  fetchConversationsSuccess,
  fetchConversationsFailure,
  fetchChatHistoryStart,
  fetchChatHistorySuccess,
  fetchChatHistoryFailure,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
