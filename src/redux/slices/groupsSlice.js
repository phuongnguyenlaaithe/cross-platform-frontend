import { createSlice } from "@reduxjs/toolkit";

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    isLoading: false,
    groups: [], 
    error: null,
  },
  reducers: {
    fetchGroupsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchGroupsSuccess: (state, action) => {
      state.isLoading = false;
      state.groups = action.payload;
    },
    fetchGroupsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    updateGroup: (state, action) => {
      const index = state.groups.findIndex((group) => group.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
    deleteGroup: (state, action) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
  },
});

export const {
  fetchGroupsStart,
  fetchGroupsSuccess,
  fetchGroupsFailed,
  addGroup,
  updateGroup,
  deleteGroup,
} = groupsSlice.actions;
export default groupsSlice.reducer;
