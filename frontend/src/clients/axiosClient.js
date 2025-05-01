import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000
    // withCredentials: true
});

instance.interceptors.response.use((response) => {
    const { data } = response;

    return response.data;
});

export default instance;
