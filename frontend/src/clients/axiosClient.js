import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000
    // withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

instance.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalRequest = err.config;

        if (!err.response) {
            console.error('Network Error:', err.message);

            return Promise.reject(err);
        }

        if (err.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers[
                            'Authorization'
                        ] = `Bearer ${token}`;
                        return instance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = Cookies.get('refreshToken');

            if (!refreshToken) {
                Cookies.remove('token');
                Cookies.remove('refreshToken');
                isRefreshing = false;
                return Promise.reject(err);
            }

            try {
                const response = await instance.post('/api/refresh-token', {
                    refreshToken: refreshToken
                });

                const newToken = response.data.token;
                const newRefreshToken = response.data.refreshToken;

                Cookies.set('token', newToken, { expires: 1 });

                if (newRefreshToken) {
                    Cookies.set('refreshToken', newRefreshToken, {
                        expires: 7
                    });
                }

                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                processQueue(null, newToken);
                isRefreshing = false;

                return instance(originalRequest);
            } catch (refreshError) {
                Cookies.remove('token');
                Cookies.remove('refreshToken');

                processQueue(refreshError, null);
                isRefreshing = false;

                return Promise.reject(refreshError);
            }
        }

        switch (err.response.status) {
            case 403:
                console.error('Forbidden:', err.response.data);

                break;
            case 404:
                console.error('Not Found:', err.response.data);

                break;
            case 500:
                console.error('Server Error:', err.response.data);

                break;
            default:
                console.error(
                    `Error ${err.response.status}:`,
                    err.response.data
                );
        }

        return Promise.reject(err);
    }
);

export default instance;
