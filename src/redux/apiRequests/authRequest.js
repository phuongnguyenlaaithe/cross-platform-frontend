import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../slices/authSlice";
import api from "../../utils/api";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await api.post("/user/auth/login", user);
      dispatch(loginSuccess(res.data));
      navigate('Home');
    } catch (error) {
      dispatch(loginFailed());
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      alert("Lỗi khi đăng nhập");
    }
  };