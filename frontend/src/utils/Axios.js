import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // BẮT BUỘC để gửi và nhận Cookie
});

export default instance;
