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
    register: {
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
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload;
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
    registerStart: state => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.sucess = true;
      state.register.error = false;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = action.payload;
    }
  },
});

export const { loginStart, loginSuccess, loginFailed, logoutStart, logoutSuccess, logoutFailed, registerStart, registerSuccess, registerFailed } = authSlice.actions;

export default authSlice.reducer; 
