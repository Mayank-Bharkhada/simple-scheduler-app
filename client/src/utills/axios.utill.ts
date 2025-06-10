import axios from 'axios';
import ENV from '../configs/env.config';

const axiosInstance = axios.create({
    baseURL: ENV.API_URL,
    withCredentials: true, 
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error || 'Something went wrong'),
);

export default axiosInstance;
