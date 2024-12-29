import axios from "axios";
import {
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailed,
  deactivateUserStart,
  deactivateUserSuccess,
  deactivateUserFailed,
  activateUserStart,
  activateUserSuccess,
  activateUserFailed,
} from "../slices/userListSlice";
import { BASE_URL } from "../../constants";

export const getAllUsers = async (accessToken, dispatch) => {
  if (!accessToken) {
    return;
  }
  dispatch(getAllUsersStart());
  try {
    const res = await axios.get(`${BASE_URL}/admin/user/get-all-profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getAllUsersSuccess(res.data));
  } catch (err) {
    dispatch(getAllUsersFailed(err.response.data));
    alert("Lỗi khi lấy danh sách người dùng: " + err.response.data.message);
  }
};

export const deactivateUser = async (userId, accessToken, dispatch) => {
  if (!accessToken) {
    return;
  }
  dispatch(deactivateUserStart());
  try {
    const res = await axios.patch(
      `${BASE_URL}/admin/user/${userId}/deactivate`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(deactivateUserSuccess(res.data));
    getAllUsers(accessToken, dispatch);
  } catch (err) {
    dispatch(deactivateUserFailed(err.response.data));
    alert("Lỗi khi vô hiệu hóa người dùng: " + err.response.data.message);
  }
};

export const activateUser = async (userId, accessToken, dispatch) => {
  if (!accessToken) {
    return;
  }
  dispatch(activateUserStart());
  try {
    const res = await axios.patch(
      `${BASE_URL}/admin/user/${userId}/activate`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(activateUserSuccess(res.data));
    getAllUsers(accessToken, dispatch);
  } catch (err) {
    dispatch(activateUserFailed(err.response.data));
    alert("Lỗi khi kích hoạt người dùng: " + err.response.data.message);
  }
};