import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDash: true,
  isCourses: false,
  isAccount: false,
};

const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState,
  reducers: {
    openDash: (state) => {
      state.isDash = true;
      state.isAccount = false;
      state.isCourses = false;
    },
    openCourses: (state) => {
      state.isDash = false;
      state.isAccount = false;
      state.isCourses = true;
    },
    openAccount: (state) => {
      state.isDash = false;
      state.isAccount = true;
      state.isCourses = false;
    },
  },
});

export const { openAccount, openCourses, openDash } = tabBarSlice.actions;

export default tabBarSlice.reducer;
