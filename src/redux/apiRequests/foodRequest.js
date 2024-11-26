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

export const getAllFoods = async (accessToken, dispatch) => {
    if (!accessToken) {
      return;
    }
    dispatch(getFoodStart());
    try {
      const res = await axios.get("http://localhost:5000/user/food", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getFoodSuccess(res.data));
    } catch (err) {
      dispatch(getFoodFailed());
    }
  };
  
export const deleteFood = async (accessToken, dispatch, id) => {
    dispatch(deleteFoodStart());
    try {
      await axios.delete(`http://localhost:5000/user/food/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(deleteFoodSuccess(id));
      getAllFoods(accessToken, dispatch);
    } catch (err) {
      dispatch(deleteFoodFailed());
    }
 };
    
 export const addNewFood = async (accessToken, dispatch, formData) => {
  dispatch(addFoodStart());

  try {
    const res = await axios.post(`http://localhost:5000/user/food`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data', 
      },
    });

    dispatch(addFoodSuccess(res.data));
    getAllFoods(accessToken, dispatch);
  } catch (err) {
    dispatch(addFoodFailed());
  }
};
