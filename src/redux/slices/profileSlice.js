import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "Profile",
    initialState: {
        currentProfile: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        getProfileStart: state => {
            state.isFetching = true;
        },
        getProfileSuccess: (state, action) => {
            state.isFetching = false;
            state.currentProfile = action.payload;
        },
        getProfileFailed: state => {
            state.isFetching = false;
            state.error = true;
        },

        updateProfileStart: state => {
            state.isFetching = true;
        },
        updateProfileSuccess: (state, action) => {
            state.isFetching = false;
            state.currentProfile = action.payload;
        },
        updateProfileFailed: state => {
            state.isFetching = false;
            state.error = true;
        },

        addProfileStart: state => {
            state.isFetching = true;
        },
        addProfileSuccess: (state) => {
            state.isFetching = false;
        },
        addProfileFailed: state => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getProfileStart,
    getProfileSuccess,
    getProfileFailed,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailed,
    addProfileStart,
    addProfileSuccess,
    addProfileFailed,
} = profileSlice.actions;

export default profileSlice.reducer;