import axios from 'axios';
import {
    getGroupTaskStart,
    getGroupTaskSuccess,
    getGroupTaskFailed,
    deleteGroupTaskStart,
    deleteGroupTaskSuccess,
    deleteGroupTaskFailed,
    addGroupTaskStart,
    addGroupTaskSuccess,
    addGroupTaskFailed,
    updateUsserTaskStart,
    updateUsserTaskSuccess,
    updateUsserTaskFailed,
    markGroupTaskAsDoneOrNotStart,
    markGroupTaskAsDoneOrNotSuccess,
    markGroupTaskAsDoneOrNotFailed,
    assignTaskStart,
    assignTaskSuccess,
    assignTaskFailed,
} from '../slices/groupTaskSlice';
import { BASE_URL } from '../../constants';
import { getAllGroupShoppingLists } from './groupShoppingListRequest';

// Lấy danh sách nhiệm vụ
export const getGroupTasks = async (accessToken, dispatch) => {
    dispatch(getGroupTaskStart());
    try {
        const res = await axios.get(`${BASE_URL}/group/task`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(getGroupTaskSuccess(res.data));
    } catch (err) {
        dispatch(getGroupTaskFailed());
        alert("Lỗi khi lấy dữ liệu: " + err.response?.data?.response.message);
    }
};

// Thêm nhiệm vụ mới
export const addGroupTask = async (accessToken, dispatch, task) => {
    dispatch(addGroupTaskStart());
    try {
        const res = await axios.post(`${BASE_URL}/group/task`, task, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(addGroupTaskSuccess(res.data));
        getAllGroupShoppingLists(accessToken, dispatch, task.groupId);
    } catch (err) {
        dispatch(addGroupTaskFailed());
        alert("Lỗi khi thêm: " + err.response?.data?.response.message);
    }
};

// Cập nhật nhiệm vụ
export const updateGroupTask = async (accessToken, dispatch, task) => {
    dispatch(updateUsserTaskStart());
    try {
        const res = await axios.put(`${BASE_URL}/group/task/${task.id}`, task, {
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
export const markGroupTaskAsDoneOrNot = async (accessToken, dispatch, taskId, groupId, shoppingListId, isDone) => {
    dispatch(markGroupTaskAsDoneOrNotStart());
    try {
        const res = await axios.patch(`${BASE_URL}/group/task/${taskId}/mark-task`, { groupId, shoppingListId, isDone }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(markGroupTaskAsDoneOrNotSuccess(res.data));
        getAllGroupShoppingLists(accessToken, dispatch, groupId);
    } catch (err) {
        dispatch(markGroupTaskAsDoneOrNotFailed());
        alert("Lỗi khi cập nhật: " + err.response?.data?.response.message);
    }
};

// Xóa nhiệm vụ
export const deleteGroupTask = async (accessToken, dispatch, taskId, groupId, shoppingListId) => {
    console.log(taskId, groupId, shoppingListId);
    dispatch(deleteGroupTaskStart());
    try {
        await axios.delete(`${BASE_URL}/group/task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: { groupId, shoppingListId}
        });
        dispatch(deleteGroupTaskSuccess());
        getAllGroupShoppingLists(accessToken, dispatch, groupId);
    } catch (err) {
        dispatch(deleteGroupTaskFailed());
        alert("Lỗi khi xóa: " + err.response?.data?.response.message);
    }
};

// Gán nhiệm vụ
export const assignTask = async (accessToken, dispatch, taskId, groupId, shoppingListId, assigneeId) => {
    console.log(taskId, groupId, shoppingListId, assigneeId);
    dispatch(assignTaskStart());
    try {
        const res = await axios.patch(`${BASE_URL}/group/task/${taskId}/assign-task`, { groupId, shoppingListId, assigneeId}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(assignTaskSuccess(res.data));
        getAllGroupShoppingLists(accessToken, dispatch, groupId);
    } catch (err) {
        dispatch(assignTaskFailed());
        alert("Lỗi khi gán: " + err.response?.data?.response.message);
    }
};