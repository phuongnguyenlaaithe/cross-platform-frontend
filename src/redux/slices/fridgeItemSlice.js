import { createSlice } from "@reduxjs/toolkit";

const fridgeItemSlice = createSlice({
  name: "fridgeItem",
  initialState: {
    allFridgeItems: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getFridgeItemStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getFridgeItemSuccess: (state, action) => {
      state.isFetching = false;
      state.allFridgeItems = action.payload;
    },
    getFridgeItemFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteFridgeItemStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteFridgeItemSuccess: (state, action) => {
      state.isFetching = false;
      state.allFridgeItems = state.allFridgeItems.filter(
        (item) => item.id !== action.payload
      );
    },
    deleteFridgeItemFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addFridgeItemStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addFridgeItemSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    addFridgeItemFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getFridgeItemStart,
  getFridgeItemSuccess,
  getFridgeItemFailed,
  deleteFridgeItemStart,
  deleteFridgeItemSuccess,
  deleteFridgeItemFailed,
  addFridgeItemStart,
  addFridgeItemSuccess,
  addFridgeItemFailed,
} = fridgeItemSlice.actions;

export default fridgeItemSlice.reducer;