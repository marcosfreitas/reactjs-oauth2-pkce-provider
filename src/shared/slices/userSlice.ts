import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@shared/store';

// Define a type for the slice state
export interface UserState {
  value: object;
}

// Define the initial state using that type
const initialState: UserState = {
  value: {},
};

// Just controlling user's data state
export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    purge: (state: UserState) => {
      state.value = {};
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state: UserState, action: PayloadAction<object>) => {
      state.value = {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { purge, update } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
