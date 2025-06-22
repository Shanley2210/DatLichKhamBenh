import express from 'express';
import {
    handleLogin,
    handleRefreshToken,
    hanleLogout
} from '../controllers/authController';
import {
    handleGetAllUsers,
    handleCreateNewUser,
    handleUpdateUser,
    handleDeleteUser,
    handleGetUserInfo
} from '../controllers/userController';
import { getAllCode } from '../controllers/allcodeController';
import {
    verifyAdmin,
    verifyAdminOrDoctor,
    verifySelfOrAdmin,
    verifyToken
} from '../middlewares/authenticateToken';
import {
    createMedicalAppointmentPlan,
    getAllDoctor,
    getDetailDoctorById,
    getDoctorHome,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    getScheduleByDate,
    postInfoDoctor
} from '../controllers/doctorController';

const router = express.Router();

const initWebRoutes = (app) => {
    //test
    router.get('/', (req, res) => {
        return res.send('Hello world');
    });

    //api auth
    router.post('/api/login', handleLogin);
    router.post('/api/refresh-token', handleRefreshToken);
    router.post('/api/logout', hanleLogout);

    //api user
    router.get(
        '/api/get-all-users',
        verifyToken,
        verifySelfOrAdmin,
        handleGetAllUsers
    );
    router.post('/api/create-new-user', verifyAdmin, handleCreateNewUser);
    router.put(
        '/api/update-user',
        verifyToken,
        verifySelfOrAdmin,
        handleUpdateUser
    );
    router.delete('/api/delete-user', verifyAdmin, handleDeleteUser);
    router.get('/api/get-user-info', verifyToken, handleGetUserInfo);

    //allcodes api
    router.get('/api/allcodes', verifyToken, getAllCode);

    //Doctor api
    router.get('/api/top-doctor-home', getDoctorHome);
    router.get('/api/get-all-doctors', getAllDoctor);
    router.post('/api/create-info-doctor', verifyAdmin, postInfoDoctor);
    router.get('/api/get-detail-doctor', getDetailDoctorById);
    router.post(
        '/api/create-medical-appointment-plan',
        verifyAdminOrDoctor,
        createMedicalAppointmentPlan
    );
    router.get('/api/get-schedule-doctor-by-date', getScheduleByDate);
    router.get('/api/get-extra-info-doctor-by-id', getExtraInfoDoctorById);
    router.get('/api/get-profile-doctor-by-id', getProfileDoctorById);

    //return
    return app.use('/', router);
};

export default initWebRoutes;
