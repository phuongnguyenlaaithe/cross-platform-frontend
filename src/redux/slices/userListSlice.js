import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
    name: "userList",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getAllUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getAllUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
            state.error = false;
        },
        getAllUsersFailed: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        deactivateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deactivateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = state.users.map((user) =>
                user.id === action.payload.id ? action.payload : user
            );
            state.error = false;
        },
        deactivateUserFailed: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        activateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        activateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = state.users.map((user) =>
                user.id === action.payload.id ? action.payload : user
            );
            state.error = false;
        },
        activateUserFailed: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
    },
});

export const {
    getAllUsersStart,
    getAllUsersSuccess,
    getAllUsersFailed,
    deactivateUserStart,
    deactivateUserSuccess,
    deactivateUserFailed,
    activateUserStart,
    activateUserSuccess,
    activateUserFailed,
} = userListSlice.actions;

export default userListSlice.reducer;