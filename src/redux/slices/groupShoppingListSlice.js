import { createSlice } from "@reduxjs/toolkit";

const groupShoppingListSlice = createSlice({
  name: "GroupShoppingList",
  initialState: {
    allGroupShoppingList: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getGroupShoppingListStart: state => {
      state.isFetching = true;
    },
    getGroupShoppingListSuccess: (state, action) => {
      state.isFetching = false;
      state.allGroupShoppingList = action.payload;
    },
    getGroupShoppingListFailed: state => {
      state.isFetching = false;
      state.error = true;
    },

    deleteGroupShoppingListStart: state => {
      state.isFetching = true;
    },
    deleteGroupShoppingListSuccess: (state) => {
      state.isFetching = false;
    },
    deleteGroupShoppingListFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addGroupShoppingListStart: state => {
      state.isFetching = true;
    },
    addGroupShoppingListSuccess: (state) => {
      state.isFetching = false;
    },
    addGroupShoppingListFailed: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getGroupShoppingListStart,
  getGroupShoppingListSuccess,
  getGroupShoppingListFailed,
  deleteGroupShoppingListFailed,
  deleteGroupShoppingListStart,
  deleteGroupShoppingListSuccess,
  addGroupShoppingListStart,
  addGroupShoppingListSuccess,
  addGroupShoppingListFailed,
} = groupShoppingListSlice.actions;

export default groupShoppingListSlice.reducer;
