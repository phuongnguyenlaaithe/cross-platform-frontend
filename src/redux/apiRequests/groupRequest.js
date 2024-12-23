import axios from "axios";
import {
  fetchGroupsFailed,
  fetchGroupsStart,
  fetchGroupsSuccess,
  addGroup,
  updateGroup,
} from "../slices/groupsSlice";
import { BASE_URL } from "../../constants";

export const getGroupsAPI = async (accessToken, dispatch) => {
  dispatch(fetchGroupsStart());
  try {
    const res = await axios.get(`${BASE_URL}/user/group`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(fetchGroupsSuccess(res.data));
  } catch (error) {
    dispatch(fetchGroupsFailed());
    alert("Lỗi khi lấy danh sách nhóm");
  }
};

export const createGroupAPI = async (accessToken, group, dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/group`, group, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(addGroup(res.data));
  } catch (error) {
    console.error("Lỗi khi tạo nhóm:", error);
    alert("Lỗi khi tạo nhóm");
  }
};

export const updateGroupAPI = async (accessToken, dispatch, groupId, group) => {
  try {
    const res = await axios.patch(`${BASE_URL}/user/group/${groupId}`, group, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response", res.data);
    dispatch(updateGroup(res.data));
  } catch (error) {
    console.error("Lỗi khi cập nhật nhóm:", error);
  }
};

export const addMemberAPI = async (accessToken, groupId, emails, dispatch) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/user/group/${groupId}/add-member`,
      { emails },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateGroup(res.data));
  } catch (error) {
    console.error("Lỗi khi thêm thành viên:", error);
    alert("Lỗi khi thêm thành viên");
  }
};

export const removeMemberAPI = async (
  accessToken,
  groupId,
  userIds,
  dispatch
) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/user/group/${groupId}/remove-member`,
      { userIds },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("response", res.data.users);
    dispatch(updateGroup(res.data));
  } catch (error) {
    console.error("Lỗi khi xóa thành viên:", error);
    alert("Lỗi khi xóa thành viên");
  }
};
