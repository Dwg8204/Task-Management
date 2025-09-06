import React, { useState, useEffect } from 'react';
import taskApi from '../api/taskApi';

const TaskFormModal = ({ taskToEdit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'initial',
    timeStart: '',
    timeFinish: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        content: taskToEdit.content || '',
        status: taskToEdit.status || 'initial',
        timeStart: taskToEdit.timeStart ? taskToEdit.timeStart.split('T')[0] : '',
        timeFinish: taskToEdit.timeFinish ? taskToEdit.timeFinish.split('T')[0] : '',
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (taskToEdit) {
        await taskApi.update(taskToEdit._id, formData);
      } else {
        await taskApi.create(formData);
      }
      onSuccess();
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      console.error(err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{taskToEdit ? 'Chỉnh sửa công việc' : 'Tạo công việc mới'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Tiêu đề"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Nội dung"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="initial">Mới</option>
            <option value="inProgress">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
          </select>
          <label>Ngày bắt đầu:</label>
          <input
            type="date"
            name="timeStart"
            value={formData.timeStart}
            onChange={handleChange}
          />
          <label>Ngày kết thúc:</label>
          <input
            type="date"
            name="timeFinish"
            value={formData.timeFinish}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button type="submit">{taskToEdit ? 'Cập nhật' : 'Tạo mới'}</button>
            <button type="button" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;