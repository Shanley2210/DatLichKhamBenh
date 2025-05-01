import {
    createNewUser,
    deleteUser,
    getAllUsers,
    updateUser
} from '../services/userService';

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

export {
    handleGetAllUsers,
    handleCreateNewUser,
    handleUpdateUser,
    handleDeleteUser
};
