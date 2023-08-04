import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    openMenu: (state, action) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state, action) => {
      state.isMenuOpen = false;
    },
    toggleMenu: (state, action) => {
      state.isMenuOpen = !action.payload;
    },
  },
});

export const { openMenu, closeMenu, toggleMenu } = navbarSlice.actions;

export default navbarSlice.reducer;
