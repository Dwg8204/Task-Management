import axiosClient from './axiosClient';

const userApi = {
  register: (data) => {
    return axiosClient.post('/users/register', data);
  },
  login: (data) => {
    return axiosClient.post('/users/login', data);
  },
  getDetail: () => {
    return axiosClient.get('/users/detail');
  },
};

export default userApi;