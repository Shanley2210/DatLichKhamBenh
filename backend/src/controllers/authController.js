import { handleUserLogin } from '../services/authService';

const handleLogin = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing request body!'
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter!'
        });
    }

    const userData = await handleUserLogin(email, password);

    if (userData.errCode !== 0) {
        return res.status(200).json(userData);
    } else {
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            userData: userData.user ? userData.user : {}
        });
    }
};

export { handleLogin };
