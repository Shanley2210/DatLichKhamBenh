import {
    createNewUser,
    deleteUser,
    getAllUsers,
    getUserInfo,
    updateUser
} from '../services/userService';

//CRUD
const handleGetAllUsers = async (req, res) => {
    const id = req.query.id ? req.query.id : null;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameters!',
            users: []
        });
    }

    const users = await getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users: users
    });
};

const handleCreateNewUser = async (req, res) => {
    let message = await createNewUser(req.body);

    return res.status(200).json(message);
};

const handleUpdateUser = async (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        });
    }

    const message = await updateUser(data);

    return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
    const id = req.query.id ? req.query.id : null;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        });
    }

    const message = await deleteUser(id);

    return res.status(200).json(message);
};

const handleGetUserInfo = async (req, res) => {
    try {
        const userId = req.user.userID;

        if (!userId) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing required parameters!'
            });
        }

        const message = await getUserInfo(userId);

        return res.status(200).json(message);
    } catch (e) {
        console.log('get user info error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

export {
    handleGetAllUsers,
    handleCreateNewUser,
    handleUpdateUser,
    handleDeleteUser,
    handleGetUserInfo
};
