import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const logoutModalSlice = createSlice({
  name: 'logoutModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = logoutModalSlice.actions;

export default logoutModalSlice.reducer;
