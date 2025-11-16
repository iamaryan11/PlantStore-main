// src/redux/cartSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient';

// This thunk dispatches to your cart route: POST /cart/add
export const addToCart = createAsyncThunk(
  'cart/add',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/cart/add', itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ... create the rest of your cartSlice with initial state and extraReducers