import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginForm: {},
  registerForm: {},
  updateForm: {},
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
    },
    updateAccntInfo: (state, action) => {
      const { name, value } = action.payload;
      state.updateForm = { ...state.updateForm, [name]: value };
      console.log(state.updateForm);
    },
  },
});

export const { setLoginDt, setRegisterDt, updateAccntInfo } =
  formsDataSlice.actions;

export default formsDataSlice.reducer;
