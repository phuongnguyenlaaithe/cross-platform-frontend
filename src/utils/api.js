import axios from "axios";

const baseURL = "https://266d-118-70-133-29.ngrok-free.app";
let axiosReduxStore

export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420"
  },
});

api.defaults.baseURL = 'https://266d-118-70-133-29.ngrok-free.app'

api.interceptors.request.use(
  (config) => {
    const state = axiosReduxStore.getState(); 
    const token = state.auth.login.currentUser?.accessToken;
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
