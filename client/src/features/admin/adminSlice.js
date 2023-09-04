import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  courses: [],
  stndsLoading: true,
  crsLoading: true,
  stdList: [],
  currentPage: 1,
  totalPages: 0,
  selectedAccnt: {},
  selectedStdClasses: [],
};

const stdUrl = '/api/v1/admin/students';
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

const dltStdUrl = '/api/v1/admin/students/delete';
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

export const getSelectedAccntPhoto = createAsyncThunk(
  'user/profilePic',
  async (payload, thunkAPI) => {
    const { profile_photo } = thunkAPI.getState().admin.selectedAccnt;

    if (profile_photo !== null) {
      const resp = await fetch(`/api/v1/s3/user/picture/${profile_photo}`);
      return resp.json();
    }
  }
);

// const stdClasses = '/api/v1/admin/student/studentId?/class';
export const getUserClasses = createAsyncThunk(
  'std/getClasses',
  async (payload) => {
    try {
      const storedToken = localStorage.getItem('Authorization');
      const resp = await fetch(`/api/v1/student/${payload}/class`, {
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

const deleteStdClass = '/api/v1/user/delete/class';
export const dropStudent = createAsyncThunk(
  'user/getClasses',
  async (payload) => {
    const { user_id, course_id } = payload;

    try {
      const storedToken = localStorage.getItem('Authorization');
      const resp = await fetch(deleteStdClass, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${storedToken}`,
        },
        body: JSON.stringify({
          user_id,
          course_id,
        }),
      });

      return resp.json();
    } catch (error) {
      console.log(error);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    displayItems: (state, action) => {
      state.stdList = [];
      const page = state.currentPage;
      const itemsPerPage = 7;

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      for (let i = startIndex; i < endIndex && i < state.students.length; i++) {
        const item = state.students[i];
        state.stdList = [...state.stdList, item];
      }
      state.totalPages = Math.ceil(state.students.length / itemsPerPage);
    },
    updatePagination: (state, action) => {
      const page = action.payload;
      state.currentPage = page;
    },
    findStd: (state, action) => {
      const query = action.payload;
      state.stdList = state.students.filter((student) => {
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
    displayAccnt: (state, action) => {
      const user = action.payload;
      state.selectedAccnt = user;
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
        state.stndsLoading = false;
        const { userId } = action.payload;
        state.stdList = state.stdList.filter(
          (student) => student.user_id !== userId
        );
      })
      .addCase(dltStudent.rejected, (state) => {
        state.stndsLoading = true;
      })
      .addCase(getSelectedAccntPhoto.pending, (state) => {})
      .addCase(getSelectedAccntPhoto.fulfilled, (state, action) => {
        if (action.payload) {
          const { url } = action.payload;
          if (url) {
            state.selectedAccnt.profile_photo = url;
          }
        }
      })
      .addCase(getSelectedAccntPhoto.rejected, (state) => {})
      .addCase(getUserClasses.pending, (state, action) => {})
      .addCase(getUserClasses.fulfilled, (state, action) => {
        const classes = action.payload;

        state.selectedStdClasses = classes;
      })
      .addCase(getUserClasses.rejected, (state, action) => {})
      .addCase(dropStudent.pending, (state) => {})
      .addCase(dropStudent.fulfilled, (state, action) => {
        const { course_id } = action.payload;

        state.selectedStdClasses = state.selectedStdClasses.filter(
          (course) => course.course_id !== course_id
        );
      })
      .addCase(dropStudent.rejected, (state) => {});
  },
});

export const { findStd, displayItems, updatePagination, displayAccnt } =
  adminSlice.actions;

export default adminSlice.reducer;
