import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'initial':
        return 'Mới';
      case 'inProgress':
        return 'Đang thực hiện';
      case 'completed':
        return 'Hoàn thành';
      default:
        return 'Chưa xác định';
    }
  };

  return (
    <div className={`task-item status-${task.status}`}>
      <div className="task-item-header">
        <h3>{task.title}</h3>
        <span className="task-status">{getStatusText(task.status)}</span>
      </div>
      <p className="task-content">{task.content}</p>
      <div className="task-item-footer">
        <div className="task-dates">
            <span>Bắt đầu: {formatDate(task.timeStart)}</span>
            <span>Kết thúc: {formatDate(task.timeFinish)}</span>
        </div>
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>Sửa</button>
          <button onClick={() => onDelete(task._id)} className="delete-btn">Xóa</button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;