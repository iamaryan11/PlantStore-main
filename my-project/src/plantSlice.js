
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient';

export const fetchPlants = createAsyncThunk(
  'plants/fetch',
  async ({page,limit,search = '', category = ''}, { rejectWithValue }) => {
    try {
    
        const url = `/allplants/plants?page=${page}&limit=${limit}&search=${search}&category=${category}`;
         const response = await axiosClient.get(url);
            return response.data;
      
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const plantSlice = createSlice({
  name: 'plants',
  initialState: {
    list: [],
    loading: false,
    error: null,
      currentPage: 1,
        totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.plants; // Assuming your backend returns an array of plants -check krna payload.plants to nhi hai
             state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default plantSlice.reducer;