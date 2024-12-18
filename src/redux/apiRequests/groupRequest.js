import {
  fetchGroupsFailed,
  fetchGroupsStart,
  fetchGroupsSuccess,
  addGroup,
  updateGroup,
} from "../slices/groupsSlice";
import api from "../../utils/api";

export const getGroupsAPI = async (dispatch) => {
  dispatch(fetchGroupsStart());
  try {
    const res = await api.get("/group");
    dispatch(fetchGroupsSuccess(res.data));
  } catch (error) {
    dispatch(fetchGroupsFailed());
    alert("Lỗi khi lấy danh sách nhóm");
  }
};

export const createGroupAPI = async (group, dispatch) => {
  try {
    const res = await api.post("/group", group);
    dispatch(addGroup(res.data));
  } catch (error) {
    console.error("Lỗi khi tạo nhóm:", error);
    alert("Lỗi khi tạo nhóm");
  }
};

export const addMemberAPI = async (groupId, emails, dispatch) => {
  try {
    const res = await api.patch(`/group/${groupId}/add-member`, { emails });
    dispatch(updateGroup(res.data));
  } catch (error) {
    console.error("Lỗi khi thêm thành viên:", error);
    alert("Lỗi khi thêm thành viên");
  }
};

export const removeMemberAPI = async (groupId, userIds, dispatch) => {
  try {
    const res = await api.patch(`/group/${groupId}/remove-member`, { userIds });
    dispatch(updateGroup(res.data));
  } catch (error) {
    console.error("Lỗi khi xóa thành viên:", error);
    alert("Lỗi khi xóa thành viên");
  }
}
