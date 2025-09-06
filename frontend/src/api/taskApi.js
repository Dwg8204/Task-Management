import axiosClient from './axiosClient';

const taskApi = {
  getAll: (params) => {
    return axiosClient.get('/tasks', { params });
  },
  getById: (id) => {
    return axiosClient.get(`/tasks/detail/${id}`);
  },
  create: (data) => {
    return axiosClient.post('/tasks/create', data);
  },
  update: (id, data) => {
    return axiosClient.patch(`/tasks/edit/${id}`, data);
  },
  delete: (id) => {
    return axiosClient.delete(`/tasks/delete/${id}`);
  },
  changeStatus: (id, status) => {
    return axiosClient.patch(`/tasks/change-status/${id}`, { status });
  },
};

export default taskApi;