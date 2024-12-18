import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed } from "../slices/authSlice";
import { BASE_URL } from '../../constants';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(`${BASE_URL}/user/auth/login`, user);
      dispatch(loginSuccess(res.data));
      navigate('Home');
    } catch (error) {
      dispatch(loginFailed());
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);      
      alert("Lỗi khi đăng nhập: " + error.response?.data?.response.message);
    }
  };

  export const registerUser = async (user, dispatch, callback) => {
    dispatch(registerStart());
    try {
      await axios.post(`${BASE_URL}/user/auth/register`, user);
      dispatch(registerSuccess());
      callback(); 
    } catch (error) {
      dispatch(registerFailed());
      console.error("Registration error:", error);
      alert("Lỗi khi đăng kí: " + error.response?.data?.response.message);
    }
  };
  