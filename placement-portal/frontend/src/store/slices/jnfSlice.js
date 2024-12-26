// store/slices/jnfSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jnfAPI from '../services/jnfAPI';

export const fetchJNFs = createAsyncThunk(
  'jnf/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await jnfAPI.getAllJNFs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createJNF = createAsyncThunk(
  'jnf/create',
  async (jnfData, { rejectWithValue }) => {
    try {
      const response = await jnfAPI.createJNF(jnfData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const jnfSlice = createSlice({
  name: 'jnf',
  initialState: {
    jnfs: [],
    currentJNF: null,
    loading: false,
    error: null,
    filters: {
      status: 'all',
      company: 'all'
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearJNF: (state) => {
      state.currentJNF = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch JNFs
      .addCase(fetchJNFs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJNFs.fulfilled, (state, action) => {
        state.loading = false;
        state.jnfs = action.payload;
      })
      .addCase(fetchJNFs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create JNF
      .addCase(createJNF.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJNF.fulfilled, (state, action) => {
        state.loading = false;
        state.jnfs.push(action.payload);
      })
      .addCase(createJNF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearJNF } = jnfSlice.actions;
export default jnfSlice.reducer;

