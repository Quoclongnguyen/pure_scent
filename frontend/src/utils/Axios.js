import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
    withCredentials: true, // BẮT BUỘC để gửi và nhận Cookie
});

instance.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if (userInfo?.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`
    }
    return config
});
export default instance;
