import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = '/api/v1/courses';

const initialState = {
  courseItems: [],
  isLoading: true,
};

export const getCourses = createAsyncThunk('courses/getCourses', async () => {
  try {
    const resp = await fetch(url);
    return resp.json();
  } catch (error) {
    console.log(error);
  }
});

const courseCrdSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    search: (state, action) => {
      const query = action.payload;
      state.courseItems = state.courseItems.filter((course) => {
        if (course.course_title.toLowerCase().includes(query.toLowerCase())) {
          return course;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseItems = action.payload;
      })
      .addCase(getCourses.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { search } = courseCrdSlice.actions;

export default courseCrdSlice.reducer;
