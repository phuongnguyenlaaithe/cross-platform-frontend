import axios from 'axios';
import {
    getUserTaskStart,
    getUserTaskSuccess,
    getUserTaskFailed,
    deleteUserTaskStart,
    deleteUserTaskSuccess,
    deleteUserTaskFailed,
    addUserTaskStart,
    addUserTaskSuccess,
    addUserTaskFailed,
    updateUsserTaskStart,
    updateUsserTaskSuccess,
    updateUsserTaskFailed,
    markUserTaskAsDoneOrNotStart,
    markUserTaskAsDoneOrNotSuccess,
    markUserTaskAsDoneOrNotFailed,
} from '../slices/userTaskSlice';
import { BASE_URL } from '../../constants';
import { getAllUserShoppingLists } from './userShoppingListRequest';

// Lấy danh sách nhiệm vụ
export const getUserTasks = async (accessToken, dispatch) => {
    dispatch(getUserTaskStart());
    try {
        const res = await axios.get(`${BASE_URL}/user/task`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUserTaskSuccess(res.data));
    } catch (err) {
        dispatch(getUserTaskFailed());
        alert("Lỗi khi lấy dữ liệu: " + err.response?.data?.response.message);
    }
};

// Thêm nhiệm vụ mới
export const addUserTask = async (accessToken, dispatch, task) => {
    dispatch(addUserTaskStart());
    try {
        const res = await axios.post(`${BASE_URL}/user/task`, task, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(addUserTaskSuccess(res.data));
        getAllUserShoppingLists(accessToken, dispatch);
    } catch (err) {
        dispatch(addUserTaskFailed());
        alert("Lỗi khi thêm: " + err.response?.data?.response.message);
    }
};

// Cập nhật nhiệm vụ
export const updateUserTask = async (accessToken, dispatch, task) => {
    dispatch(updateUsserTaskStart());
    try {
        const res = await axios.put(`${BASE_URL}/user/task/${task.id}`, task, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateUsserTaskSuccess(res.data));
    } catch (err) {
        dispatch(updateUsserTaskFailed());
        alert("Lỗi khi cập nhật: " + err.response?.data?.response.message);
    }
};

// Đánh dấu nhiệm vụ đã hoàn thành hoặc chưa hoàn thành
export const markUserTaskAsDoneOrNot = async (accessToken, dispatch, taskId, shoppingListId, isDone) => {
    dispatch(markUserTaskAsDoneOrNotStart());
    try {
        const res = await axios.patch(`${BASE_URL}/user/task/${taskId}/mark-task`, { shoppingListId, isDone }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(markUserTaskAsDoneOrNotSuccess(res.data));
        getAllUserShoppingLists(accessToken, dispatch);
    } catch (err) {
        dispatch(markUserTaskAsDoneOrNotFailed());
        alert("Lỗi khi cập nhật: " + err.response?.data?.response.message);
    }
};

// Xóa nhiệm vụ
export const deleteUserTask = async (accessToken, dispatch, taskId) => {
    dispatch(deleteUserTaskStart());
    try {
        await axios.delete(`${BASE_URL}/user/task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteUserTaskSuccess());
        getAllUserShoppingLists(accessToken, dispatch);
    } catch (err) {
        dispatch(deleteUserTaskFailed());
        alert("Lỗi khi xóa: " + err.response?.data?.response.message);
    }
};