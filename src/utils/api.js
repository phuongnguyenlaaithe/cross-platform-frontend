import axios from "axios";

const baseURL = "http://localhost:5000";
let axiosReduxStore

export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.defaults.baseURL = 'http://localhost:5000'


// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const state = axiosReduxStore.getState(); 
    const token = state.auth.login.currentUser?.accessToken;
    console.log("token", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
