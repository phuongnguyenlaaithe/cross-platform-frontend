import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from './redux/slices/authSlice';

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTokens = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        dispatch(loginSuccess({ accessToken, refreshToken }));
      }
    };

    loadTokens();
  }, [dispatch]);

  return children;
};

export default AuthLoader;