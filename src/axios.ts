import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://admin-panel.herokuapp.com', //http://localhost:4000
});

instance.interceptors.request.use((config: any) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;
