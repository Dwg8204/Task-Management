import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo"><Link to="/">Quản lý công việc</Link></div>
      {currentUser && (
        <div className="user-info">
          {}
          {/* Tạo một Link lớn bao quanh tên và avatar */}
          <Link to="/profile" className="user-profile-link">
            <span>Chào, {currentUser.fullName}</span>
            <img 
              src={currentUser.avatar || 'https://via.placeholder.com/40'} 
              alt="Avatar" 
              className="header-avatar"
            />
          </Link>
          
          <button onClick={handleLogout}>Đăng xuất</button>
          {}
        </div>
      )}
    </header>
  );
};

export default Header;