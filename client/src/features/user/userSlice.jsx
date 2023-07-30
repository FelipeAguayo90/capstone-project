import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    first_name: '',
    is_admin: null,
    last_login: null,
    msg: '',
    token: '',
    user_id: null,
  },

  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const user = action.payload;
      //   console.log(user);
      state.user = action.payload;
      console.log(state.user);

      //   console.log(state.user);
    },
  },
});

// console.log(userSlice);

export const { loginSuccess } = userSlice.actions;

export default userSlice.reducer;
