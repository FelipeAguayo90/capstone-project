import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'api/v1/register';

const initialState = {
  isShort: false,
  hasUpperCs: false,
  hasLowerCs: false,
  hasSpclChar: false,
  hasNumber: false,
  invalUsername: false,
  invalEmail: false,
};

export const registerUser = createAsyncThunk(
  'register/newUser',
  (payload, thunkAPI) => {
    const { username, email, password, firstName, lastName } =
      thunkAPI.getState().formsData.registerForm;

    const isAdmin = false;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        isAdmin: isAdmin,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
);

const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    dsplShortMsg: (state) => {
      state.isShort = true;
      state.hasUpperCs = false;
      state.hasLowerCs = false;
      state.hasSpclChar = false;
      state.hasNumber = false;
    },
    dsplUpperCsMsg: (state) => {
      state.hasUpperCs = true;
      state.isShort = false;
      state.hasLowerCs = false;
      state.hasSpclChar = false;
      state.hasNumber = false;
    },
    dsplLowerCsMsg: (state) => {
      state.hasLowerCs = true;
      state.isShort = false;
      state.hasUpperCs = false;
      state.hasSpclChar = false;
      state.hasNumber = false;
    },
    dsplSpclCharMsg: (state) => {
      state.hasSpclChar = true;
      state.isShort = false;
      state.hasUpperCs = false;
      state.hasLowerCs = false;
      state.hasNumber = false;
    },
    dsplHasNum: (state) => {
      state.hasNumber = true;
      state.isShort = false;
      state.hasUpperCs = false;
      state.hasLowerCs = false;
      state.hasSpclChar = false;
    },
    dsplInvalUsernameMsg: (state) => {
      state.invalUsername = true;
    },
    dsplInvalEmailMsg: (state) => {
      state.invalEmail = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {
        let result = action.payload;
        state.isShort = false;
        state.hasUpperCs = false;
        state.hasLowerCs = false;
        state.hasSpclChar = false;
        state.hasNumber = false;
        state.invalUsername = false;
        state.invalEmail = false;
        if (result.msg.constraint === 'account_username_key') {
          state.invalUsername = true;
        }
        if (result.msg.constraint === 'account_email_key') {
          state.invalEmail = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('something went wrong');
      });
  },
});

export const {
  dsplHasNum,
  dsplShortMsg,
  dsplLowerCsMsg,
  dsplUpperCsMsg,
  dsplInvalEmailMsg,
  dsplInvalUsernameMsg,
  dsplSpclCharMsg,
} = registrationSlice.actions;

export default registrationSlice.reducer;
