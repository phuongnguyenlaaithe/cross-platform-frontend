import axios from "axios";
import {
  getGroupShoppingListStart,
  getGroupShoppingListSuccess,
  getGroupShoppingListFailed,
  deleteGroupShoppingListStart,
  deleteGroupShoppingListSuccess,
  deleteGroupShoppingListFailed,
  addGroupShoppingListStart,
  addGroupShoppingListSuccess,
  addGroupShoppingListFailed,
} from "../slices/groupShoppingListSlice";
import { BASE_URL } from '../../constants';

export const getAllGroupShoppingLists = async (accessToken, dispatch, groupId) => {
  if (!accessToken) {
    return;
  }
  dispatch(getGroupShoppingListStart());
  try {
    const res = await axios.get(`${BASE_URL}/group/shopping-list`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { groupId }
    });
    dispatch(getGroupShoppingListSuccess(res.data));
  } catch (err) {
    dispatch(getGroupShoppingListFailed());
    alert("Lỗi khi lấy dữ liệu: " + err.response?.data?.response.message);
  }
};

export const deleteGroupShoppingList = async (accessToken, dispatch, id, groupId) => {
  dispatch(deleteGroupShoppingListStart());
  try {
    await axios.delete(`${BASE_URL}/group/shopping-list/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { groupId }
    });
    dispatch(deleteGroupShoppingListSuccess(id));
    getAllGroupShoppingLists(accessToken, dispatch, groupId);
  } catch (err) {
    dispatch(deleteGroupShoppingListFailed());
    alert("Lỗi khi xóa: " + err.response?.data?.response.message);
  }
};

export const addNewGroupShoppingList = async (accessToken, dispatch, data) => {
  dispatch(addGroupShoppingListStart());
  try {
    await axios.post(`${BASE_URL}/group/shopping-list`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(addGroupShoppingListSuccess());
    getAllGroupShoppingLists(accessToken, dispatch, data.groupId);
  } catch (err) {
    dispatch(addGroupShoppingListFailed());
    alert("Lỗi khi thêm: " + err.response?.data?.response.message);
  }
};