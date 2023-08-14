import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  courses: [],
  stndsLoading: true,
  crsLoading: true,
};

const stdUrl = 'http://localhost:5173/api/v1/admin/students';
export const getStudents = createAsyncThunk(
  'admin/getStudents',
  async (payload, thunkAPI) => {
    const storedToken = localStorage.getItem('Authorization');

    // const { token } = thunkAPI.getState().user.user;
    try {
      const resp = await fetch(stdUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${storedToken}`,
        },
      });
      return resp.json();
    } catch (error) {
      console.log(error);
    }
  }
);

const dltStdUrl = 'http://localhost:5173/api/v1/admin/students/delete';
export const dltStudent = createAsyncThunk(
  'admin/dltStudents',
  async (payload, thunkAPI) => {
    const storedToken = localStorage.getItem('Authorization');

    // const { token, user_id } = thunkAPI.getState().user.user;
    try {
      const resp = await fetch(dltStdUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${storedToken}`,
        },
        body: JSON.stringify({
          user_id: payload,
        }),
      });
      return resp.json();
    } catch (error) {
      console.log('Something went wrong');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    findStd: (state, action) => {
      const query = action.payload;
      state.students = state.students.filter((student) => {
        if (student.first_name.toLowerCase().includes(query.toLowerCase())) {
          return student;
        }
        if (student.last_name.toLowerCase().includes(query.toLowerCase())) {
          return student;
        }
        if (student.username.toLowerCase().includes(query.toLowerCase())) {
          return student;
        }
        if (
          (
            student.first_name.toLowerCase() +
            ' ' +
            student.last_name.toLowerCase()
          ).includes(query.toLowerCase())
        ) {
          return student;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.stndsLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.stndsLoading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state) => {
        state.stndsLoading = true;
      })
      .addCase(dltStudent.pending, (state) => {
        state.stndsLoading = true;
      })
      .addCase(dltStudent.fulfilled, (state, action) => {
        console.log(action);
        state.stndsLoading = false;
      })
      .addCase(dltStudent.rejected, (state) => {
        state.stndsLoading = true;
      });
  },
});

export const { findStd } = adminSlice.actions;

export default adminSlice.reducer;
