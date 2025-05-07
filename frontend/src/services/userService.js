import axios from '@clients/axiosClient';

const getAllUser = async (inputId) => {
    return await axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId });
};

const addNewUser = async (data) => {
    return await axios.post(`/api/create-new-user`, data);
};

const deleteUser = async (userId) => {
    return await axios.delete(`/api/delete-user?id=${userId}`, { id: userId });
};

const updateUser = async (data) => {
    return await axios.put(`/api/update-user`, data);
};

const getUserInfo = async (token) => {
    return await axios.get(`/api/get-user-info`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export { getAllUser, addNewUser, deleteUser, updateUser, getUserInfo };
