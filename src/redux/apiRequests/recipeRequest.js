import axios from 'axios';
import { BASE_URL } from '../../constants';
import {
  getRecipeStart,
  getRecipeSuccess,
  getRecipeFailed,
  deleteRecipeStart,
  deleteRecipeSuccess,
  deleteRecipeFailed,
  addRecipeStart,
  addRecipeSuccess,
  addRecipeFailed,
} from '../slices/recipeSlice';

export const getAllRecipeAPI = async (accessToken, dispatch) => {
  if (!accessToken) {
    return;
  }
  dispatch(getRecipeStart());
  try {
    const res = await axios.get(`${BASE_URL}/user/recipe`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getRecipeSuccess(res.data));
  } catch (err) {
    dispatch(getRecipeFailed());
  }
};

export const deleteRecipeAPI = async (accessToken, dispatch, id) => {
  dispatch(deleteRecipeStart());
  try {
    await axios.delete(`${BASE_URL}/user/recipe/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteRecipeSuccess(id));
    getAllRecipeAPI(accessToken, dispatch);
  } catch (err) {
    dispatch(deleteRecipeFailed());
  }
};

export const addNewRecipeAPI = async (accessToken, dispatch, data) => {
  dispatch(addRecipeStart());
  try {
    const res = await axios.post(`${BASE_URL}/user/recipe`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(addRecipeSuccess(res.data));
    getAllRecipeAPI(accessToken, dispatch);
  } catch (err) {
    dispatch(addRecipeFailed());
  }
};
