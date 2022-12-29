import { registerUser } from '@app/domain/actions/registerUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@shared/store';

export interface AuthState {
  loading: boolean;
  userInfo: object;
  userToken: string | null;
  error: object | null;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [registerUser.pending.toString()]: (state: AuthState) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled.toString()]: (state: AuthState) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected.toString()]: (
      state: AuthState,
      action: PayloadAction<object>,
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
