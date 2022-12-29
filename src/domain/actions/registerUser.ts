import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// @todo get url from AuthService received instance
const backendURL = 'http://127.0.0.1:5000';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: object, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(backendURL, payload, config);
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
