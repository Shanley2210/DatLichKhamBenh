import db from '../models/index';

const getTopDoctorsHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                where: { roleId: 'R2' },
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: [
                        'password',
                        'refreshToken',
                        'createdAt',
                        'updatedAt'
                    ]
                },
                include: [
                    {
                        model: db.AllCode,
                        as: 'positionData',
                        attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.AllCode,
                        as: 'genderData',
                        attributes: ['valueEn', 'valueVi']
                    }
                ],
                raw: true,
                nest: true
            });

            if (!users) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Doctors not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'OK',
                data: users
            });
        } catch (e) {
            return reject(e);
        }
    });
};

export { getTopDoctorsHome };
