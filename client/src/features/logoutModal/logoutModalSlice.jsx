import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isDltOpen: false,
  userId: null,
};

const logoutModalSlice = createSlice({
  name: 'logoutModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    openDltModal: (state) => {
      state.isDltOpen = true;
    },
    closeDltModal: (state) => {
      state.isDltOpen = false;
    },
    setUsrId: (state, action) => {
      state.userId = action.payload;
      console.log(state.userId);
    },
  },
});

export const { openModal, closeModal, openDltModal, closeDltModal, setUsrId } =
  logoutModalSlice.actions;

export default logoutModalSlice.reducer;
