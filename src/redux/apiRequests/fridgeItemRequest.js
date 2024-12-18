import axios from "axios";
import {
  getFridgeItemStart,
  getFridgeItemSuccess,
  getFridgeItemFailed,
  deleteFridgeItemStart,
  deleteFridgeItemSuccess,
  deleteFridgeItemFailed,
  addFridgeItemStart,
  addFridgeItemSuccess,
  addFridgeItemFailed,
} from "../slices/fridgeItemSlice";
import { BASE_URL } from '../../constants';

export const getAllFridgeItems = async (accessToken, dispatch) => {
  if (!accessToken) {
    return;
  }
  dispatch(getFridgeItemStart());
  try {
    const res = await axios.get(`${BASE_URL}/fridge-item?page=1&limit=10`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getFridgeItemSuccess(res.data));
  } catch (err) {
    dispatch(getFridgeItemFailed());
    alert("Lỗi khi lấy dữ liệu: " + err.response?.data?.response.message);
  }
};

export const deleteFridgeItem = async (accessToken, dispatch, id) => {
  dispatch(deleteFridgeItemStart());
  try {
    await axios.delete(`${BASE_URL}/fridge-item/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteFridgeItemSuccess(id));
    getAllFridgeItems(accessToken, dispatch);
  } catch (err) {
    dispatch(deleteFridgeItemFailed());
    alert("Lỗi khi xóa: " + err.response?.data?.response.message);
  }
};

export const addNewFridgeItem = async (accessToken, dispatch, data) => {
  dispatch(addFridgeItemStart());
  try {
    await axios.post(`${BASE_URL}/fridge-item`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(addFridgeItemSuccess());
    getAllFridgeItems(accessToken, dispatch);
  } catch (err) {
    dispatch(addFridgeItemFailed());
    alert("Lỗi khi thêm: " + err.response?.data?.response.message);
  }
};