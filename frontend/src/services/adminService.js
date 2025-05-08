import axios from '@clients/axiosClient';

const getAllCodes = async (type, token) => {
    return await axios.get(`/api/allcodes?type=${type}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export { getAllCodes };
