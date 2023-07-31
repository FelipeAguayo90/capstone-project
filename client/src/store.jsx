import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import logoutModalReducer from './features/logoutModal/logoutModalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    logoutModal: logoutModalReducer,
  },
});
