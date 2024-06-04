// features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: [{ username: string, password: string }] | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserStart(state) {
      state.status = 'loading';
    },
    registerUserSuccess(state, action: PayloadAction<{ username: string, password: string }>) {
      state.status = 'succeeded';
      state.user = [action.payload];
      state.isAuthenticated = true;
    },
    registerUserFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    loginUser(state) {
      state.user = null;
      state.isAuthenticated = true;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
