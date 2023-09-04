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
  profilePic: null,
  isLoading: true,
  invalCredentials: false,
};
// http://localhost:5173
const url2 = '/api/v1/user/verify-token';
export const isUser = createAsyncThunk('user/isUser', async () => {
  const storedToken = localStorage.getItem('Authorization');
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

const enrollUrl = '/api/v1/user/enroll';
export const classEnroll = createAsyncThunk(
  'user/enroll',
  async (payload, thunkAPI) => {
    const storedToken = localStorage.getItem('Authorization');

    const { course, student } = payload;
    const resp = await fetch(enrollUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${storedToken}`,
      },
      body: JSON.stringify({
        user_id: student,
        course_id: course,
      }),
    });

    return resp.json();
  }
);

export const getProfilePhoto = createAsyncThunk(
  'user/profilePic',
  async (payload, thunkAPI) => {
    const { profile_photo } = thunkAPI.getState().user.user;

    if (profile_photo) {
      const resp = await fetch(`/api/v1/s3/profile/picture/${profile_photo}`);
      return resp.json();
    }
  }
);

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

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const urlUpdate = '/api/v1/user/update';
export const updateUser = createAsyncThunk(
  'user/update',
  (payload, thunkAPI) => {
    const storedToken = localStorage.getItem('Authorization');
    const user_id = payload;
    // const { user_id } = thunkAPI.getState().user.user;
    console.log(user_id);

    const userInfo = thunkAPI.getState().formsData.updateForm;

    if (isObjectEmpty(userInfo)) return;
    console.log(userInfo);
    return fetch(urlUpdate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${storedToken}`,
      },
      body: JSON.stringify({
        userInfo,
        user_id,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoading = false;

      console.log(action.payload);
      state.user = action.payload.user;
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

        const { token } = action.payload;

        localStorage.setItem('Authorization', token);
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(isUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          action.payload.msg ===
          'The user name or password provided is incorrect.'
        ) {
          state.invalCredentials = true;
          return;
        }
        state.user = action.payload;
      })
      .addCase(isUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProfilePhoto.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProfilePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          const { url } = action.payload;
          if (url) {
            state.user.profile_photo = url;
          }
        }
      })
      .addCase(getProfilePhoto.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        console.log('almost');
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log('something went wrong');
      });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
