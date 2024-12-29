import axios from 'axios';
import {
    getProfileStart,
    getProfileSuccess,
    getProfileFailed,
    addProfileStart,
    addProfileSuccess,
    addProfileFailed,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailed,
} from '../slices/profileSlice';
import { BASE_URL } from '../../constants';

export const getProfile = async (accessToken, dispatch, userId) => {
    if (!accessToken) {
        return;
    }
    dispatch(getProfileStart());
    try {
        const res = await axios.get(`${BASE_URL}/user/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(getProfileSuccess(res.data));
    } catch (err) {
        dispatch(getProfileFailed());
        alert("Lỗi khi lấy dữ liệu: " + err.response?.data?.response.message);
    }
};

export const addProfile = async (accessToken, dispatch, profile) => {
    dispatch(addProfileStart());
    try {
        const res = await axios.post(`${BASE_URL}/user/profile`, profile, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(addProfileSuccess(res.data));
        getProfile(accessToken, dispatch, res.data.userId);
        alert("Thêm thông tin thành công");
    } catch (err) {
        dispatch(addProfileFailed());
        alert("Lỗi khi thêm: " + err.response?.data?.response.message);
    }
};

export const updateProfile = async (accessToken, dispatch, userId, profile) => {
    dispatch(updateProfileStart());
    try {
        const res = await axios.patch(`${BASE_URL}/user/profile/${userId}`, profile, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(updateProfileSuccess(res.data));
        getProfile(accessToken, dispatch, res.data.userId);
        alert("Cập nhật thông tin thành công");
    } catch (err) {
        dispatch(updateProfileFailed());
        alert("Lỗi khi cập nhật: " + err.response?.data?.response.message);
    }
};