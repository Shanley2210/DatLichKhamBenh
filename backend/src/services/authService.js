import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail }
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {};

            const isExist = await checkUserEmail(email);

            if (isExist) {
                const user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'password', 'roleId'],
                    raw: true
                });

                if (user) {
                    const checkPassword = await bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (checkPassword) {
                        const token = jwt.sign(
                            {
                                userID: user.id,
                                roleID: user.roleId,
                                positionID: user.positionId
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: '1d'
                            }
                        );

                        const refreshToken = jwt.sign(
                            {
                                userID: user.id,
                                roleID: user.roleId,
                                positionID: user.positionId
                            },
                            process.env.JWT_REFRESH_SECRET,
                            {
                                expiresIn: '7d'
                            }
                        );

                        try {
                            await db.User.update(
                                { refreshToken: refreshToken },
                                { where: { id: user.id } }
                            );
                        } catch (updateError) {
                            console.error(
                                'Error updating refreshToken:',
                                updateError
                            );
                            userData.errCode = 4;
                            userData.errMessage =
                                'Error updating refresh token';
                            return resolve(userData);
                        }

                        userData.errCode = 0;
                        userData.message = 'Login successfully';
                        userData.token = token;
                        userData.refreshToken = refreshToken;
                        delete user.password;
                        delete user.id;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Password is incorrect`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = `User's not found`;
            }

            return resolve(userData);
        } catch (e) {
            return reject(e);
        }
    });
};

const handleUserRefreshToken = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            let decoded;
            try {
                decoded = jwt.verify(
                    refreshToken,
                    process.env.JWT_REFRESH_SECRET
                );
            } catch (error) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Invalid or expired refresh token'
                });
            }

            const user = await db.User.findOne({
                where: { refreshToken: refreshToken }
            });

            if (!user) {
                return resolve({
                    errCode: 3,
                    errMessage: 'User not found or user has been logged out'
                });
            }

            const token = jwt.sign(
                {
                    userID: user.id,
                    roleID: user.roleId,
                    positionID: user.positionId
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            return resolve({
                errCode: 0,
                message: 'Refresh token successfully',
                token: token
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const handleUserLogout = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { refreshToken: refreshToken }
            });

            if (user) {
                await db.User.update(
                    { refreshToken: null },
                    { where: { id: user.id } }
                );
                return resolve({ errCode: 0, message: 'Logout successfully' });
            } else {
                return resolve({
                    errCode: 2,
                    errMessage: 'User not found or user has been logged out'
                });
            }
        } catch (e) {
            return reject(e);
        }
    });
};

export { handleUserLogin, handleUserLogout, handleUserRefreshToken };
