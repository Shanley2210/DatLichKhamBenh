import axios from '@clients/axiosClient';

const handleLogin = async (data) => {
    return await axios.post('/api/login', data);
};

export { handleLogin };
