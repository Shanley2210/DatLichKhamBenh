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

const getScheduleByDate = async (doctorId, date) => {
    return await axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};

const getExtraInfoDoctorById = async (doctorId) => {
    return await axios.get(
        `/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`
    );
};

const getProfileDoctorById = async (doctorId) => {
    return await axios.get(
        `/api/get-profile-doctor-by-id?doctorId=${doctorId}`
    );
};

export {
    topDoctorsHome,
    allDoctors,
    saveDoctorInfo,
    getDetailDoctor,
    createMedicalAppointmentPlan,
    getScheduleByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById
};
