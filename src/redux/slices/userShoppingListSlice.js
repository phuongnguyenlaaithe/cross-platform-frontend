import { createSlice } from "@reduxjs/toolkit";

const userShoppingListSlice = createSlice({
  name: "UserShoppingList",
  initialState: {
    allUserShoppingList: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getUserShoppingListStart: state => {
      state.isFetching = true;
    },
    getUserShoppingListSuccess: (state, action) => {
      state.isFetching = false;
      state.allUserShoppingList = action.payload;
    },
    getUserShoppingListFailed: state => {
      state.isFetching = false;
      state.error = true;
    },

    deleteUserShoppingListStart: state => {
      state.isFetching = true;
    },
    deleteUserShoppingListSuccess: (state) => {
      state.isFetching = false;
    },
    deleteUserShoppingListFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addUserShoppingListStart: state => {
      state.isFetching = true;
    },
    addUserShoppingListSuccess: (state) => {
      state.isFetching = false;
    },
    addUserShoppingListFailed: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getUserShoppingListStart,
  getUserShoppingListSuccess,
  getUserShoppingListFailed,
  deleteUserShoppingListFailed,
  deleteUserShoppingListStart,
  deleteUserShoppingListSuccess,
  addUserShoppingListStart,
  addUserShoppingListSuccess,
  addUserShoppingListFailed,
} = userShoppingListSlice.actions;

export default userShoppingListSlice.reducer;
