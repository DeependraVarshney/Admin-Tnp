// store/slices/companySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import companyAPI from '../services/companyAPI';

export const fetchCompanies = createAsyncThunk(
  'company/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await companyAPI.getAllCompanies();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    currentCompany: null,
    loading: false,
    error: null,
    visits: [],
    stats: {
      total: 0,
      active: 0,
      upcoming: 0
    }
  },
  reducers: {
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

