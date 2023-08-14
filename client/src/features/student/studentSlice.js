import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  studentClasses: [],
  stndsLoading: true,
  crsLoading: true,
};

const stdUrl = 'api/vi/admin/students';
export const getStudents = createAsyncThunk(
  'students/getStudents',
  async () => {
    try {
      const resp = await fetch(stdUrl);
      return resp.json();
    } catch (error) {
      console.log(error);
    }
  }
);

const studentSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state, action) => {})
      .addCase(getStudents.fulfilled, (state, action) => {})
      .addCase(getStudents.rejected, (state, action) => {});
  },
});

export const {} = studentSlice.actions;

export default studentSlice.reducer;
