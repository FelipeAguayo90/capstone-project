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
    token: null,
  },
  isLoading: true,
  invalCredentials: false,
};

const url2 = 'http://localhost:5173/api/v1/verify-token';
export const isUser = createAsyncThunk('user/isUser', async () => {
  console.log('hello');
  const storedToken = localStorage.getItem('Authorization');
  console.log(storedToken);
  try {
    const resp = await fetch(url2, {
      method: 'GET',
      headers: {
        Authorization: `${storedToken}`,
      },
    });
    return resp.json();
  } catch (error) {
    console.log(error);
  }
});

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
        state.user = {
          email,
          first_name,
          is_admin,
          last_login,
          user_id,
          user,
          token,
        };
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(isUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(typeof action.payload);
        const uSer = true;
        if (
          action.payload.msg ===
          'The user name or password provided is incorrect.'
        ) {
          state.invalCredentials = true;
          return;
        }
        const { email, first_name, is_admin, last_login, user_id } =
          action.payload[0];
        // localStorage.setItem('Authorization', token);
        state.user = {
          ...state.user,
          email,
          first_name,
          is_admin,
          last_login,
          user_id,
          user: uSer,
          // token,
        };
      })
      .addCase(isUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
