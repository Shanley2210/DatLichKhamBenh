import axios from '@clients/axiosClient';

const handleLogin = async (data) => {
    return await axios.post('/api/login', data);
};

const handleLogout = async (refreshToken) => {
    return await axios.post('/api/logout', { refreshToken });
};

export { handleLogin, handleLogout };
