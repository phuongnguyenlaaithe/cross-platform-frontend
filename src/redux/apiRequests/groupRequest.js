    import { fetchGroupsFailed, fetchGroupsStart, fetchGroupsSuccess } from "../slices/groupsSlice";
    import api from "../../utils/api";

    export const getGroups = async (dispatch) => {
        dispatch(fetchGroupsStart());
        try {
            console.log("api", api.defaults.baseURL);
            const res = await api.get("/group");
            dispatch(fetchGroupsSuccess(res.data));
        } catch (error) {
            dispatch(fetchGroupsFailed());
            alert("Lỗi khi lấy danh sách nhóm");
        }
    }

    export const addGroup = async (group, dispatch) => {
        try {
            const formData = new FormData();
            formData.append("name", group.name);
            formData.append("image", group.image.file);

            const res = await api.post("/group", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(addGroup(res.data));
        } catch (error) {
            console.error("Lỗi khi tạo nhóm:", error);
            alert("Lỗi khi tạo nhóm");
        }
    };
