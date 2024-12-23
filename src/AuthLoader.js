import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTokens } from './redux/apiRequests/authRequest';

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadTokens(dispatch);
  }, [dispatch]);

  return children;
};

export default AuthLoader;