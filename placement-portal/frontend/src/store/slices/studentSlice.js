// store/slices/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import studentAPI from '../services/studentAPI';

export const fetchStudents = createAsyncThunk(
  'student/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getAllStudents(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudentProfile = createAsyncThunk(
  'student/updateProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await studentAPI.updateProfile(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    currentStudent: null,
    loading: false,
    error: null,
    filters: {
      branch: 'all',
      year: 'all',
      placementStatus: 'all'
    },
    stats: {
      total: 0,
      placed: 0,
      eligible: 0
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setCurrentStudent: (state, action) => {
      state.currentStudent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

