import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    adminLogin: {
      currentAdmin: null,
      isFetching: false,
      error: false,
    },
    adminLogout: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    adminLoginStart: state => {
      state.adminLogin.isFetching = true;
    },
    adminLoginSuccess: (state, action) => {
      state.adminLogin.isFetching = false;
      state.adminLogin.currentAdmin = action.payload;
      state.adminLogin.error = false;
      // Lưu accessToken và refreshToken vào AsyncStorage
      AsyncStorage.setItem('accessToken', action.payload.accessToken);
      AsyncStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    adminLoginFailed: (state) => {
      state.adminLogin.isFetching = false;
      state.adminLogin.error = true;
    },

    adminLogoutStart: state => {
      state.adminLogout.isFetching = true;
    },
    adminLogoutSuccess: (state) => {
      state.adminLogout.isFetching = false;
      state.adminLogin.currentAdmin = null;
      state.adminLogout.error = false;
      // Xóa accessToken và refreshToken khỏi AsyncStorage
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');
    },
    adminLogoutFailed: state => {
      state.adminLogin.isFetching = false;
      state.adminLogin.error = true;
    },
  },
});

export const { adminLoginStart, adminLoginSuccess, adminLoginFailed, adminLogoutStart, adminLogoutSuccess, adminLogoutFailed } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;