import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
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

const getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = null;

            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: { exclude: ['password', 'refreshToken'] },
                    order: [['updatedAt', 'DESC']]
                });
            }

            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ['password', 'refreshToken'] }
                });
            }

            return resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

const hasUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            return resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExist = await checkUserEmail(data.email);

            if (isExist === true) {
                return resolve({
                    errCode: 1,
                    errMessage:
                        'Your email is already in used, please try another email!'
                });
            }

            const hashPassword = await hasUserPassword(data.password);

            const base64Data = data.image.replace(
                /^data:image\/\w+;base64,/,
                ''
            );
            const imageBuffer = Buffer.from(base64Data, 'base64');

            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                image: imageBuffer,
                roleId: data.role,
                positionId: data.position
            });

            return resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }

            const user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });

            if (!user) {
                return resolve({
                    errCode: 3,
                    errMessage: `The user isn't exist`
                });
            }

            const base64Data = data.image.replace(
                /^data:image\/\w+;base64,/,
                ''
            );
            const imageBuffer = Buffer.from(base64Data, 'base64');

            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            user.gender = data.gender;
            user.image = imageBuffer;
            user.roleId = data.roleId;
            user.positionId = data.positionId;

            await user.save();

            return resolve({
                errCode: 0,
                message: 'User has been updated!'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId }
            });

            if (!user) {
                return resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                });
            }

            await db.User.destroy({
                where: { id: userId }
            });

            return resolve({
                errCode: 0,
                message: 'User has been deleted!'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getUserInfo = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                });
                return;
            }

            const user = await db.User.findOne({
                where: { id: userId },
                attributes: { exclude: ['password', 'refreshToken'] }
            });

            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User not found!'
                });
                return;
            }

            resolve({
                errCode: 0,
                message: 'OK',
                userData: user
            });
        } catch (e) {
            reject(e);
        }
    });
};

export { getAllUsers, createNewUser, deleteUser, updateUser, getUserInfo };
