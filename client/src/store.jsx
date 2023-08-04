import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import logoutModalReducer from './features/logoutModal/logoutModalSlice';
import navbarReducer from './features/navbar/navbarSlice';
import tabBarReducer from './features/tabBar/tabBarSlice';
import formsDataReducer from './features/formsData/formsDataSlice';
import carouselReducer from './features/carousel/carouselSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    logoutModal: logoutModalReducer,
    navbar: navbarReducer,
    tabBar: tabBarReducer,
    formsData: formsDataReducer,
    carousel: carouselReducer,
  },
});
