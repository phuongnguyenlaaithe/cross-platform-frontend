import axios from "axios";
import {
    getCategoryStart,
    getCategorySuccess,
    getCategoryFailed,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailed,
    addCategoryStart,
    addCategorySuccess,
    addCategoryFailed,
    } from "../slices/categorySlice";

export const getAllCategory = async (accessToken, dispatch) => {
    if (!accessToken) {
      // Handle the case when 'token' is missing or null
      return;
    }
    dispatch(getCategoryStart());
    try {
      const res = await axios.get("http://localhost:5000/admin/category", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getCategorySuccess(res.data));
    } catch (err) {
      dispatch(getCategoryFailed());
    }
  };
  
export const deleteCategory = async (accessToken, dispatch, id) => {
    dispatch(deleteCategoryStart());
    try {
      await axios.delete(`http://localhost:5000/admin/category/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(deleteCategorySuccess(id));
      getAllCategory(accessToken, dispatch);
    } catch (err) {
      dispatch(deleteCategoryFailed());
    }
 };
    
 export const addNewCategory = async (accessToken, dispatch, data) => {
  dispatch(addCategoryStart());

  try {
    const res = await axios.post(`http://localhost:5000/admin/category`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(addCategorySuccess(res.data));
    getAllCategory(accessToken, dispatch);
  } catch (err) {
    dispatch(addCategoryFailed());
  }
};
