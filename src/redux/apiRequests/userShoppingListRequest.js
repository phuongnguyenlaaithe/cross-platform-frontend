import axios from "axios";
import {
  getUserShoppingListStart,
  getUserShoppingListSuccess,
  getUserShoppingListFailed,
  deleteUserShoppingListStart,
  deleteUserShoppingListSuccess,
  deleteUserShoppingListFailed,
  addUserShoppingListStart,
  addUserShoppingListSuccess,
  addUserShoppingListFailed,
} from "../slices/userShoppingListSlice";
import { BASE_URL } from '../../constants';

export const getAllUserShoppingLists = async (accessToken, dispatch) => {
  if (!accessToken) {
    return;
  }
  dispatch(getUserShoppingListStart());
  try {
    const res = await axios.get(`${BASE_URL}/user/shopping-list`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUserShoppingListSuccess(res.data));
  } catch (err) {
    dispatch(getUserShoppingListFailed());
    alert("Lỗi khi lấy dữ liệu: " + err.response?.data?.response.message);
  }
};

export const deleteUserShoppingList = async (accessToken, dispatch, id) => {
  dispatch(deleteUserShoppingListStart());
  try {
    await axios.delete(`${BASE_URL}/user/shopping-list/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserShoppingListSuccess(id));
    getAllUserShoppingLists(accessToken, dispatch);
  } catch (err) {
    dispatch(deleteUserShoppingListFailed());
    alert("Lỗi khi xóa: " + err.response?.data?.response.message);
  }
};

export const addNewUserShoppingList = async (accessToken, dispatch, data) => {
  dispatch(addUserShoppingListStart());
  try {
    await axios.post(`${BASE_URL}/user/shopping-list`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(addUserShoppingListSuccess());
    getAllUserShoppingLists(accessToken, dispatch);
  } catch (err) {
    dispatch(addUserShoppingListFailed());
    alert("Lỗi khi thêm: " + err.response?.data?.response.message);
  }
};