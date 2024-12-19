import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "Category",
  initialState: {
    allCategory: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getCategoryStart: state => {
      state.isFetching = true;
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.allCategory = action.payload;
    },
    getCategoryFailed: state => {
      state.isFetching = false;
      state.error = true;
    },

    deleteCategoryStart: state => {
      state.isFetching = true;
    },
    deleteCategorySuccess: (state) => {
      state.isFetching = false;
    },
    deleteCategoryFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addCategoryStart: state => {
      state.isFetching = true;
    },
    addCategorySuccess: (state) => {
      state.isFetching = false;
    },
    addCategoryFailed: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailed,
  deleteCategoryFailed,
  deleteCategoryStart,
  deleteCategorySuccess,
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailed,
} = categorySlice.actions;

export default categorySlice.reducer;
