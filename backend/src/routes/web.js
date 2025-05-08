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
    verifySelfOrAdmin,
    verifyToken
} from '../middlewares/authenticateToken';

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
    router.get('/api/allcodes', verifyAdmin, getAllCode);

    //return
    return app.use('/', router);
};

export default initWebRoutes;
