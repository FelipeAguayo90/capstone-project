import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginForm: {},
  registerForm: {},
};

const formsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    setLoginDt: (state, action) => {
      const { name, value } = action.payload;
      state.loginForm = { ...state.loginForm, [name]: value };
    },
    setRegisterDt: (state, action) => {
      state.registerForm = action.payload;
    },
  },
});

export const { setLoginDt, setRegisterDt } = formsDataSlice.actions;

export default formsDataSlice.reducer;
