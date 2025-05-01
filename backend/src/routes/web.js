import express from 'express';
import { handleLogin } from '../controllers/authController';
import {
    handleGetAllUsers,
    handleCreateNewUser,
    handleUpdateUser,
    handleDeleteUser
} from '../controllers/userController';

const router = express.Router();

const initWebRoutes = (app) => {
    //test
    router.get('/', (req, res) => {
        return res.send('Hello world');
    });

    //api login
    router.post('/api/login', handleLogin);

    //api user
    router.get('/api/get-all-users', handleGetAllUsers);
    router.post('/api/create-new-user', handleCreateNewUser);
    router.put('/api/update-user', handleUpdateUser);
    router.delete('/api/delete-user', handleDeleteUser);

    //return
    return app.use('/', router);
};

export default initWebRoutes;
