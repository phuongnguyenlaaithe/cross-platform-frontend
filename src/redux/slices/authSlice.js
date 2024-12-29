import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    logout: {
      isFetching: false,
      error: false,
      success: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: state => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
      // Lưu accessToken và refreshToken vào AsyncStorage
      AsyncStorage.setItem('accessToken', action.payload.accessToken);
      AsyncStorage.setItem('refreshToken', action.payload.refreshToken);
      AsyncStorage.setItem('userId', action.payload.userId.toString());
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },

    logoutStart: state => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.logout.isFetching = false;
      state.login.currentUser = null;
      state.logout.error = false;
      // Xóa accessToken và refreshToken khỏi AsyncStorage
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('userId');
    },
    logoutFailed: state => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: state => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    }
  },
});

export const { loginStart, loginSuccess, loginFailed, logoutStart, logoutSuccess, logoutFailed, registerStart, registerSuccess, registerFailed } = authSlice.actions;

export default authSlice.reducer;