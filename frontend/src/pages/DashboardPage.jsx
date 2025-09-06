import React, { useState, useEffect, useCallback } from 'react';
import taskApi from '../api/taskApi';
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import TaskFormModal from '../components/TaskFormModal';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    keyword: '',
    page: 1,
    limit: 5,
  });
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await taskApi.getAll(filters);
      setTasks(response.data); 
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };
  
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    fetchTasks();
  };
  
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
        try {
            await taskApi.delete(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    }
  };


  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <h1>Bảng điều khiển công việc</h1>
        <div className="controls">
          <button onClick={handleOpenCreateModal}>Thêm công việc mới</button>
          <input
            type="text"
            name="keyword"
            placeholder="Tìm kiếm công việc..."
            value={filters.keyword}
            onChange={handleFilterChange}
          />
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Tất cả trạng thái</option>
            <option value="initial">Mới</option>
            <option value="inProgress">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
          </select>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="task-list">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskItem 
                    key={task._id} 
                    task={task} 
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p>Không có công việc nào.</p>
            )}
          </div>
        )}

        {isModalOpen && (
          <TaskFormModal
            taskToEdit={editingTask}
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;