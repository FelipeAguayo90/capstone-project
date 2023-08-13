import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'api/v1/login';

const initialState = {
  user: {
    email: null,
    first_name: null,
    is_admin: null,
    last_login: null,
    user_id: null,
    user: false,
  },
  isLoading: true,
  invalCredentials: false,
};

export const getUser = createAsyncThunk('user/getUser', (payload, thunkAPI) => {
  const { username, password } = thunkAPI.getState().formsData.loginForm;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoading = false;

      console.log(action.payload);
      state.user = action.payload;
      localStorage.setItem('Authorization', action.payload.token);
    },
    logout: (state) => {
      state.user = {
        email: null,
        first_name: null,
        is_admin: null,
        last_login: null,
        user_id: null,
        user: false,
      };
      localStorage.setItem('Authorization', '');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (
          action.payload.msg ===
          'The user name or password provided is incorrect.'
        ) {
          state.invalCredentials = true;
          return;
        }
        const {
          email,
          first_name,
          is_admin,
          last_login,
          user_id,
          user,
          token,
        } = action.payload;
        localStorage.setItem('Authorization', token);
        state.user = { email, first_name, is_admin, last_login, user_id, user };
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
