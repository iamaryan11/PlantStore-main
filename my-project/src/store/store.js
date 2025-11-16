import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';
import plantsReducer from '../plantSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
     plants: plantsReducer
  }
});

