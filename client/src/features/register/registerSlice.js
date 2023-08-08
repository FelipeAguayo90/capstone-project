import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isShort: false,
  hasUpperCs: false,
  hasLowerCs: false,
  hasSpclChar: false,
  hasNumber: false,
  invalUsername: false,
  invalEmail: false,
};

const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    dsplShortMsg: (state) => {
      state.isShort = true;
    },
    dsplUpperCsMsg: (state) => {
      state.hasUpperCs = true;
    },
    dsplLowerCsMsg: (state) => {
      state.hasLowerCs = true;
    },
    dsplSpclCharMsg: (state) => {
      state.hasSpclChar = true;
    },
    dsplInvalUsernameMsg: (state) => {
      state.invalUsername = true;
    },
    dsplInvalEmailMsg: (state) => {
      state.invalEmail = true;
    },
  },
});

export const {
  dsplLowerCsMsg,
  dsplUpperCsMsg,
  dsplInvalEmailMsg,
  dsplInvalUsernameMsg,
  dsplSpclCharMsg,
} = registrationSlice.actions;

export default registrationSlice.reducer;
