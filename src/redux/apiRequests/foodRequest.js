import axios from "axios";
import {
    getFoodStart,
    getFoodSuccess,
    getFoodFailed,
    deleteFoodStart,
    deleteFoodSuccess,
    deleteFoodFailed,
    addFoodStart,
    addFoodSuccess,
    addFoodFailed,
    } from "../slices/foodSlice";
import { BASE_URL } from '../../constants';

export const getAllFoods = async (accessToken, dispatch) => {
    if (!accessToken) {
      return;
    }
    dispatch(getFoodStart());
    try {
      const res = await axios.get(`${BASE_URL}/user/food`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getFoodSuccess(res.data));
    } catch (err) {
      dispatch(getFoodFailed());
      alert("Lỗi khi lấy dữ liệu: " + err.response?.data?.response.message);
    }
  };
  
export const deleteFood = async (accessToken, dispatch, id) => {
    dispatch(deleteFoodStart());
    try {
      await axios.delete(`${BASE_URL}/user/food/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(deleteFoodSuccess(id));
      getAllFoods(accessToken, dispatch);
    } catch (err) {
      dispatch(deleteFoodFailed());
      alert("Lỗi khi xóa: " + err.response?.data?.response.message);
    }
 };
    
 export const addNewFood = async (accessToken, dispatch, formData) => {
  dispatch(addFoodStart());

  try {
      await axios.post(`${BASE_URL}/user/food`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data', 
      },
    });

    dispatch(addFoodSuccess());
    getAllFoods(accessToken, dispatch);
  } catch (err) {
    dispatch(addFoodFailed());
    alert("Lỗi khi thêm: " + err.response?.data?.response.message);
  }
};
