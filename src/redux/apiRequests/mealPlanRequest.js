import axios from "axios";
import { BASE_URL } from "../../constants";
import {
  getMealPlanStart,
  getMealPlanSuccess,
  getMealPlanFailed,
  deleteMealPlanStart,
  deleteMealPlanSuccess,
  deleteMealPlanFailed,
  addMealPlanStart,
  addMealPlanSuccess,
  addMealPlanFailed,
} from "../slices/mealPlanSlice";

export const getAllMealPlanAPI = async (accessToken, dispatch) => {
  if (!accessToken) {
    return;
  }
  dispatch(getMealPlanStart());
  try {
    const res = await axios.get(`${BASE_URL}/meal-plan`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getMealPlanSuccess(res.data));
  } catch (err) {
    dispatch(getMealPlanFailed());
  }
};

export const deleteMealPlanAPI = async (accessToken, dispatch, id) => {
  dispatch(deleteMealPlanStart());
  try {
    await axios.delete(`${BASE_URL}/meal-plan/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteMealPlanSuccess(id));
    getAllMealPlanAPI(accessToken, dispatch);
  } catch (err) {
    dispatch(deleteMealPlanFailed());
  }
};

export const addNewMealPlanAPI = async (accessToken, dispatch, data) => {
  dispatch(addMealPlanStart());

  try {
    const res = await axios.post(`${BASE_URL}/meal-plan`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(addMealPlanSuccess(res.data));
    getAllMealPlanAPI(accessToken, dispatch);
  } catch (err) {
    dispatch(addMealPlanFailed());
  }
};
