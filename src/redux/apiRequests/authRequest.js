import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed, logoutStart, logoutSuccess, logoutFailed } from "../slices/authSlice";
import { adminLoginStart, adminLoginSuccess, adminLoginFailed, adminLogoutStart, adminLogoutSuccess, adminLogoutFailed } from "../slices/adminAuthSlide";
import { BASE_URL } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${BASE_URL}/user/auth/login`, user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailed());
        console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
        alert("Lỗi khi đăng nhập: " + error.response?.data?.response.message);
    }
};

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess());
        navigate('Login');
    } catch (error) {
        dispatch(logoutFailed());
        console.error("Lỗi khi đăng xuất:", error);
        alert("Lỗi khi đăng xuất: " + error.message);
    }
};

export const adminLogin = async (admin, dispatch, navigate) => {
    dispatch(adminLoginStart());
    try {
        const res = await axios.post(`${BASE_URL}/admin/auth/login`, admin);
        dispatch(adminLoginSuccess(res.data));
    } catch (error) {
        dispatch(adminLoginFailed());
        console.error("Lỗi khi đăng nhập:", error);
        alert("Lỗi khi đăng nhập: " + error.response?.data?.response.message);
    }
};

export const adminLogout = async (dispatch, navigate) => {
    dispatch(adminLogoutStart());
    try {
        dispatch(adminLogoutSuccess());
    } catch (error) {
        dispatch(adminLogoutFailed());
        console.error("Lỗi khi đăng xuất:", error);
        alert("Lỗi khi đăng xuất: " + error.message);
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
    const userId = await AsyncStorage.getItem('userId');
    if (accessToken && refreshToken && userId) {
        const isValid = await verifyToken(accessToken);
        if (isValid) {
            dispatch(loginSuccess({ accessToken, refreshToken, userId }));
        } else {
            try {
                const newAccessToken = await refreshAccessToken(refreshToken);
                await AsyncStorage.setItem('accessToken', newAccessToken);
                dispatch(loginSuccess({ accessToken: newAccessToken, refreshToken, userId }));
            } catch (error) {
                console.error("Error refreshing token:", error);
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('refreshToken');
                await AsyncStorage.removeItem('userId');
                dispatch(logoutSuccess());
            }
        }
    }
};

export const getAllUsers = async (accessToken, dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/user/get-all-user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Lỗi khi lấy danh sách người dùng: " + error.response?.data?.response.message);
    }
};