import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "Recipe",
  initialState: {
    allRecipe: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getRecipeStart: state => {
      state.isFetching = true;
    },
    getRecipeSuccess: (state, action) => {
      state.isFetching = false;
      state.allRecipe = action.payload;
    },
    getRecipeFailed: state => {
      state.isFetching = false;
      state.error = true;
    },

    deleteRecipeStart: state => {
      state.isFetching = true;
    },
    deleteRecipeSuccess: (state) => {
      state.isFetching = false;
    },
    deleteRecipeFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addRecipeStart: state => {
      state.isFetching = true;
    },
    addRecipeSuccess: (state) => {
      state.isFetching = false;
    },
    addRecipeFailed: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getRecipeStart,
  getRecipeSuccess,
  getRecipeFailed,
  deleteRecipeFailed,
  deleteRecipeStart,
  deleteRecipeSuccess,
  addRecipeStart,
  addRecipeSuccess,
  addRecipeFailed,
} = recipeSlice.actions;

export default recipeSlice.reducer;
