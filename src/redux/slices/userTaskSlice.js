import { createSlice } from "@reduxjs/toolkit";

const userTaskSlice = createSlice({
    name: "UserTask",
    initialState: {
        allUserTask: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getUserTaskStart: state => {
            state.isFetching = true;
        },
        getUserTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.allUserTask = action.payload;
        },
        getUserTaskFailed: state => {
            state.isFetching = false;
            state.error = true;
        },

        updateUsserTaskStart: state => {
            state.isFetching = true;
        },
        updateUsserTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.allUserTask = state.allUserTask.map((task) => task.id === action.payload.id ? action.payload : task);
        },
        updateUsserTaskFailed: state => {
            state.isFetching = false;
            state.error = true;
        },

        markUserTaskAsDoneOrNotStart: state => {
            state.isFetching = true;
        },
        markUserTaskAsDoneOrNotSuccess: (state, action) => {
            state.isFetching = false;
            state.allUserTask = state.allUserTask.map((task) => task.id === action.payload.id ? action.payload : task);
        },
        markUserTaskAsDoneOrNotFailed: state => {
            state.isFetching = false;
            state.error = true;
        },

        deleteUserTaskStart: state => {
            state.isFetching = true;
        },
        deleteUserTaskSuccess: (state) => {
            state.isFetching = false;
        },
        deleteUserTaskFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        addUserTaskStart: state => {
            state.isFetching = true;
        },
        addUserTaskSuccess: (state) => {
            state.isFetching = false;
        },
        addUserTaskFailed: state => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getUserTaskStart,
    getUserTaskSuccess,
    getUserTaskFailed,
    deleteUserTaskFailed,
    deleteUserTaskStart,
    deleteUserTaskSuccess,
    addUserTaskStart,
    addUserTaskSuccess,
    addUserTaskFailed,
    updateUsserTaskStart,
    updateUsserTaskSuccess,
    updateUsserTaskFailed,
    markUserTaskAsDoneOrNotStart,
    markUserTaskAsDoneOrNotSuccess,
    markUserTaskAsDoneOrNotFailed,
} = userTaskSlice.actions;

export default userTaskSlice.reducer;
