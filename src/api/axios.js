import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Pointing to your new PHP backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add a request interceptor to attach auth tokens if needed in the future
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
