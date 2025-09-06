import React, { createContext, useState, useEffect } from 'react';
import userApi from '../api/userApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập từ trước chưa
    const checkCurrentUser = async () => {
      try {
        const response = await userApi.getDetail();
        setCurrentUser(response.data.info);
      } catch (error) {
        console.log('Not logged in');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkCurrentUser();
  }, []);

  const login = async (email, password) => {
    const response = await userApi.login({ email, password });
    //Lấy thông tin user
    const userDetails = await userApi.getDetail();
    setCurrentUser(userDetails.data.info);
    return response;
  };

  const register = async (fullName, email, password) => {
    const response = await userApi.register({ fullName, email, password });
    // Tự động đăng nhập sau khi đăng ký
    const userDetails = await userApi.getDetail();
    setCurrentUser(userDetails.data.info);
    return response;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};