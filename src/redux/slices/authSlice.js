import { createSlice } from "@reduxjs/toolkit";

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
      sucess: false,
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
    },
    loginFailed: state => {
      state.login.isFetching = false;
      state.login.error = true;
    },

    logoutStart: state => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.logout.isFetching = false;
      state.logout.currentUser = null;
      state.logout.error = false;
    },
    logoutFailed: state => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logoutStart, logoutSuccess, logoutFailed} = authSlice.actions;

export default authSlice.reducer; 
