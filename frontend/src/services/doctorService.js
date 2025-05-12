import axios from '@clients/axiosClient';

const topDoctorsHome = async (limit) => {
    return await axios.get('/api/top-doctor-home', { params: { limit } });
};

export { topDoctorsHome };
