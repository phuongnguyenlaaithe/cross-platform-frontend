import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed, logoutSuccess } from "../slices/authSlice";
import { BASE_URL } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(`${BASE_URL}/user/auth/login`, user);
      dispatch(loginSuccess(res.data));
      navigate('Home');
    } catch (error) {
      dispatch(loginFailed());
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);      
      alert("Lỗi khi đăng nhập: " + error.response?.data?.response.message);
    }
};

export const registerUser = async (user, dispatch, callback) => {
    dispatch(registerStart());
    try {
      await axios.post(`${BASE_URL}/user/auth/register`, user);
      dispatch(registerSuccess());
      callback(); 
    } catch (error) {
      dispatch(registerFailed());
      console.error("Registration error:", error);
      alert("Lỗi khi đăng kí: " + error.response?.data?.response.message);
    }
};

export const verifyToken = async (token) => {
    const response = await axios.get(`${BASE_URL}/user/auth/verify-token`, { token });
    return response.data.valid;
};

export const refreshAccessToken = async (refreshToken) => {
    const response = await axios.post(`${BASE_URL}/user/auth/refresh-token`, { refreshToken });
    return response.data.accessToken;
};

export const loadTokens = async (dispatch) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
        const isValid = await verifyToken(accessToken);
        if (isValid) {
            dispatch(loginSuccess({ accessToken, refreshToken }));
        } else {
            try {
                const newAccessToken = await refreshAccessToken(refreshToken);
                await AsyncStorage.setItem('accessToken', newAccessToken);
                dispatch(loginSuccess({ accessToken: newAccessToken, refreshToken }));
            } catch (error) {
                console.error("Error refreshing token:", error);
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('refreshToken');
                dispatch(logoutSuccess());
            }
        }
    }
};