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
      const { name, value } = action.payload;
      state.registerForm = { ...state.registerForm, [name]: value };
      console.log(state.registerForm);
    },
  },
});

export const { setLoginDt, setRegisterDt } = formsDataSlice.actions;

export default formsDataSlice.reducer;
