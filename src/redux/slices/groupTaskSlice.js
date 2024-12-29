import { createSlice } from "@reduxjs/toolkit";

const groupTaskSlice = createSlice({
    name: "GroupTask",
    initialState: {
        allGroupTask: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getGroupTaskStart: state => {
            state.isFetching = true;
        },
        getGroupTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.allGroupTask = action.payload;
        },
        getGroupTaskFailed: state => {
            state.isFetching = false;
            state.error = true;
        },

        updateUsserTaskStart: state => {
            state.isFetching = true;
        },
        updateUsserTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.allGroupTask = state.allGroupTask.map((task) => task.id === action.payload.id ? action.payload : task);
        },
        updateUsserTaskFailed: state => {
            state.isFetching = false;
            state.error = true;
        },

        markGroupTaskAsDoneOrNotStart: state => {
            state.isFetching = true;
        },
        markGroupTaskAsDoneOrNotSuccess: (state, action) => {
            state.isFetching = false;
            state.allGroupTask = state.allGroupTask.map((task) => task.id === action.payload.id ? action.payload : task);
        },
        markGroupTaskAsDoneOrNotFailed: state => {
            state.isFetching = false;
            state.error = true;
        },

        deleteGroupTaskStart: state => {
            state.isFetching = true;
        },
        deleteGroupTaskSuccess: (state) => {
            state.isFetching = false;
        },
        deleteGroupTaskFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        addGroupTaskStart: state => {
            state.isFetching = true;
        },
        addGroupTaskSuccess: (state) => {
            state.isFetching = false;
        },
        addGroupTaskFailed: state => {
            state.isFetching = false;
            state.error = true;
        },
        assignTaskStart: state => {
            state.isFetching = true;
        },
        assignTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.allGroupTask = state.allGroupTask.map((task) => task.id === action.payload.id ? action.payload : task);
        },
        assignTaskFailed: state => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getGroupTaskStart,
    getGroupTaskSuccess,
    getGroupTaskFailed,
    deleteGroupTaskFailed,
    deleteGroupTaskStart,
    deleteGroupTaskSuccess,
    addGroupTaskStart,
    addGroupTaskSuccess,
    addGroupTaskFailed,
    updateUsserTaskStart,
    updateUsserTaskSuccess,
    updateUsserTaskFailed,
    markGroupTaskAsDoneOrNotStart,
    markGroupTaskAsDoneOrNotSuccess,
    markGroupTaskAsDoneOrNotFailed,
    assignTaskStart,
    assignTaskSuccess,
    assignTaskFailed,
} = groupTaskSlice.actions;

export default groupTaskSlice.reducer;
