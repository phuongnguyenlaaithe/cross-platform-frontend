import { createSlice } from "@reduxjs/toolkit";

const measurementSlice = createSlice({
  name: "Measurement",
  initialState: {
    allMeasurement: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getMeasurementStart: state => {
      state.isFetching = true;
    },
    getMeasurementSuccess: (state, action) => {
      state.isFetching = false;
      state.allMeasurement = action.payload;
    },
    getMeasurementFailed: state => {
      state.isFetching = false;
      state.error = true;
    },

    deleteMeasurementStart: state => {
      state.isFetching = true;
    },
    deleteMeasurementSuccess: (state) => {
      state.isFetching = false;
    },
    deleteMeasurementFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addMeasurementStart: state => {
      state.isFetching = true;
    },
    addMeasurementSuccess: (state) => {
      state.isFetching = false;
    },
    addMeasurementFailed: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getMeasurementStart,
  getMeasurementSuccess,
  getMeasurementFailed,
  deleteMeasurementFailed,
  deleteMeasurementStart,
  deleteMeasurementSuccess,
  addMeasurementStart,
  addMeasurementSuccess,
  addMeasurementFailed,
} = measurementSlice.actions;

export default measurementSlice.reducer;
