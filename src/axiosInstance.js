// axiosInstance.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://e794-121-135-181-35.ngrok-free.app',
});

apiClient.interceptors.request.use(
    (config) => {
        config.headers['ngrok-skip-brower-warning'] = true;
        return config;
    },
    (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
    (config) => {
        config.headers['ngrok-skip-brower-warning'] = true;
        return config;
    },
    (error) => Promise.reject(error)
);
export default apiClient;
