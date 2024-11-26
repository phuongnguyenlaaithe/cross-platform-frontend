import axios from "axios";
import {
    getMeasurementStart,
    getMeasurementSuccess,
    getMeasurementFailed,
    deleteMeasurementStart,
    deleteMeasurementSuccess,
    deleteMeasurementFailed,
    addMeasurementStart,
    addMeasurementSuccess,
    addMeasurementFailed,
    } from "../slices/measurementSlice";

export const getAllMeasurement = async (accessToken, dispatch) => {
    if (!accessToken) {
      return;
    }
    dispatch(getMeasurementStart());
    try {
      const res = await axios.get("http://localhost:5000/admin/measurement", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getMeasurementSuccess(res.data));
    } catch (err) {
      dispatch(getMeasurementFailed());
    }
  };
  
export const deleteMeasurement = async (accessToken, dispatch, id) => {
    dispatch(deleteMeasurementStart());
    try {
      await axios.delete(`http://localhost:5000/admin/measurement/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(deleteMeasurementSuccess(id));
      getAllMeasurement(accessToken, dispatch);
    } catch (err) {
      dispatch(deleteMeasurementFailed());
    }
 };
    
 export const addNewMeasurement = async (accessToken, dispatch, data) => {
  dispatch(addMeasurementStart());

  try {
    const res = await axios.post(`http://localhost:5000/admin/measurement`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(addMeasurementSuccess(res.data));
    getAllMeasurement(accessToken, dispatch);
  } catch (err) {
    dispatch(addMeasurementFailed());
  }
};
