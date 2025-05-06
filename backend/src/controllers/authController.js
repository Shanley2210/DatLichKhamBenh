import {
    handleUserLogin,
    handleUserLogout,
    handleUserRefreshToken
} from '../services/authService';

const handleLogin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters!'
            });
        }

        const email = req.body.email;
        const password = req.body.password;

        const userData = await handleUserLogin(email, password);

        return res.status(200).json(userData);
    } catch (e) {
        console.log('login error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const handleRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters!'
            });
        }

        const message = await handleUserRefreshToken(refreshToken);

        return res.status(200).json(message);
    } catch (e) {
        console.log('refresh token error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

const hanleLogout = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters!'
            });
        }

        const message = await handleUserLogout(refreshToken);

        return res.status(200).json(message);
    } catch (e) {
        console.log('logout error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

export { handleLogin, hanleLogout, handleRefreshToken };
