import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo">Quản lý công việc</div>
      {currentUser && (
        <div className="user-info">
          <span>Chào, {currentUser.fullName}</span>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      )}
    </header>
  );
};

export default Header;