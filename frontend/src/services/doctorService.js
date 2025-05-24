import axios from '@clients/axiosClient';
import { data } from 'react-router-dom';

const topDoctorsHome = async (limit) => {
    return await axios.get('/api/top-doctor-home', { params: { limit } });
};

const allDoctors = async () => {
    return await axios.get('/api/get-all-doctors');
};

const saveDoctorInfo = async (data) => {
    return await axios.post('/api/create-info-doctor', data);
};

const getDetailDoctor = async (id) => {
    return await axios.get(`/api/get-detail-doctor?id=${id}`);
};

const createMedicalAppointmentPlan = async (data) => {
    return await axios.post('/api/create-medical-appointment-plan', data);
};

export {
    topDoctorsHome,
    allDoctors,
    saveDoctorInfo,
    getDetailDoctor,
    createMedicalAppointmentPlan
};
