import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  studentClasses: [],
  totalTuition: 0,
  stndsLoading: true,
  crsLoading: true,
  classesLoading: true,
};

export const getStdClasses = createAsyncThunk(
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

const deleteClass = '/api/v1/user/delete/class';
export const dropClass = createAsyncThunk('user/dropClass', async (payload) => {
  const { user_id, course_id } = payload;
  console.log(payload);

  try {
    const storedToken = localStorage.getItem('Authorization');
    const resp = await fetch(deleteClass, {
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
});

const studentSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStdClasses.pending, (state, action) => {
        state.classesLoading = true;
      })
      .addCase(getStdClasses.fulfilled, (state, action) => {
        state.classesLoading = false;
        state.studentClasses = action.payload;
      })
      .addCase(getStdClasses.rejected, (state, action) => {
        state.classesLoading = true;
      })
      .addCase(dropClass.pending, (state, action) => {
        state.classesLoading = true;
      })
      .addCase(dropClass.fulfilled, (state, action) => {
        state.classesLoading = true;

        const { course_id } = action.payload;
        console.log(course_id);
        state.studentClasses = state.studentClasses.filter(
          (course) => course.course_id !== course_id
        );
      })
      .addCase(dropClass.rejected, (state, action) => {
        state.classesLoading = true;
      });
  },
});

export const {} = studentSlice.actions;

export default studentSlice.reducer;
