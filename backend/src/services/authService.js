import db from '../models/index';
import bcrypt from 'bcryptjs';

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
                    attributes: [
                        'email',
                        'password',
                        'roleId',
                        'firstName',
                        'lastName'
                    ],
                    raw: true
                });

                if (user) {
                    const checkPassword = await bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
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

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

export { handleUserLogin };
