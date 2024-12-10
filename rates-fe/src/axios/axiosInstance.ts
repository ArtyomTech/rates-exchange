import axios from 'axios';

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
