import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "Food",
  initialState: {
    allFood: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getFoodStart: state => {
      state.isFetching = true;
    },
    getFoodSuccess: (state, action) => {
      state.isFetching = false;
      state.allFood = action.payload;
    },
    getFoodFailed: state => {
      state.isFetching = false;
      state.error = true;
    },

    deleteFoodStart: state => {
      state.isFetching = true;
    },
    deleteFoodSuccess: (state) => {
      state.isFetching = false;
    },
    deleteFoodFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addFoodStart: state => {
      state.isFetching = true;
    },
    addFoodSuccess: (state) => {
      state.isFetching = false;
    },
    addFoodFailed: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getFoodStart,
  getFoodSuccess,
  getFoodFailed,
  deleteFoodFailed,
  deleteFoodStart,
  deleteFoodSuccess,
  addFoodStart,
  addFoodSuccess,
  addFoodFailed,
} = foodSlice.actions;

export default foodSlice.reducer;
