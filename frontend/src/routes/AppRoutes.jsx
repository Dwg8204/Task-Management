import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>
      
      {/* Not Found Route */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;