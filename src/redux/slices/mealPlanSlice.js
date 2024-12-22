import { createSlice } from "@reduxjs/toolkit";

const mealPlanSlice = createSlice({
  name: "MealPlan",
  initialState: {
    allMealPlan: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getMealPlanStart: state => {
      state.isFetching = true;
    },
    getMealPlanSuccess: (state, action) => {
      state.isFetching = false;
      state.allMealPlan = action.payload;
    },
    getFoodFailed: state => {
      state.isFetching = false;
      state.error = true;
    },

    deleteMealPlanStart: state => {
      state.isFetching = true;
    },
    deleteMealPlanSuccess: (state) => {
      state.isFetching = false;
    },
    deleteMealPlanFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addMealPlanStart: state => {
      state.isFetching = true;
    },
    addMealPlanSuccess: (state) => {
      state.isFetching = false;
    },
    addMealPlanFailed: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getMealPlanStart,
  getMealPlanSuccess,
  getFoodFailed,
  deleteMealPlanStart,
  deleteMealPlanSuccess,
  deleteMealPlanFailed,
  addMealPlanStart,
  addMealPlanSuccess,
  addMealPlanFailed,
} = mealPlanSlice.actions;

export default mealPlanSlice.reducer;
