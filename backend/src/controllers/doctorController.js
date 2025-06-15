import {
    createAppointmentPlan,
    extraInfoDoctorById,
    getAllDoctors,
    getDetailDoctor,
    getScheduleDate,
    getTopDoctorsHome,
    saveDetailInfoDoctor
} from '../services/doctorService';

const getDoctorHome = async (req, res) => {
    const limit = req.query.limit ? req.query.limit : 10;

    try {
        const doctors = await getTopDoctorsHome(+limit);

        return res.status(200).json(doctors);
    } catch (e) {
        console.log('get home doctor error: ', e);

        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const getAllDoctor = async (req, res) => {
    try {
        const doctors = await getAllDoctors();

        return res.status(200).json(doctors);
    } catch (e) {
        console.log('get all doctor error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const postInfoDoctor = async (req, res) => {
    try {
        const response = await saveDetailInfoDoctor(req.body);

        return res.status(200).json(response);
    } catch (e) {
        console.log('post infor doctor error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const getDetailDoctorById = async (req, res) => {
    try {
        const response = await getDetailDoctor(req.query.id);

        return res.status(200).json(response);
    } catch (e) {
        console.log('get detail doctor by id error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const createMedicalAppointmentPlan = async (req, res) => {
    try {
        const response = await createAppointmentPlan(req.body);

        return res.status(200).json(response);
    } catch (e) {
        console.log('create medical appointment plan error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const getScheduleByDate = async (req, res) => {
    try {
        const response = await getScheduleDate(
            req.query.doctorId,
            req.query.date
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log('get schedule by date error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const getExtraInfoDoctorById = async (req, res) => {
    try {
        const response = await extraInfoDoctorById(req.query.doctorId);

        return res.status(200).json(response);
    } catch (e) {
        console.log('get extra info doctor by id error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

export {
    getDoctorHome,
    getAllDoctor,
    postInfoDoctor,
    getDetailDoctorById,
    createMedicalAppointmentPlan,
    getScheduleByDate,
    getExtraInfoDoctorById
};
