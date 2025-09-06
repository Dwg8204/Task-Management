import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  // Xử lý trường hợp component render trước khi context có dữ liệu
  if (!currentUser) {
    return (
      <>
        <Header />
        <div className="main-content">
          <p>Đang tải thông tin người dùng...</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="main-content">
        <h1>Thông tin cá nhân</h1>
        <div className="profile-container">
          <div className="profile-avatar-container">
            {/* Nếu có avatar thì hiển thị, nếu không thì hiển thị placeholder */}
            <img 
              src={currentUser.avatar || 'https://via.placeholder.com/150'} 
              alt="Avatar"
              className="profile-avatar"
            />
          </div>
          <div className="profile-info">
            <div className="profile-info-row">
              <span className="profile-label">Họ và tên:</span>
              <span>{currentUser.fullName}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-label">Email:</span>
              <span>{currentUser.email}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-label">Số điện thoại:</span>
              {/* Hiển thị 'Chưa cập nhật' nếu không có số điện thoại */}
              <span>{currentUser.phone || 'Chưa cập nhật'}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-label">Trạng thái:</span>
              <span className="status-active">{currentUser.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;