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

const getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: [
                        'password',
                        'refreshToken',
                        'createdAt',
                        'updatedAt',
                        'image'
                    ]
                }
            });

            return resolve({
                errCode: 0,
                message: 'OK',
                data: doctors
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const saveDetailInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !inputData.doctorId ||
                !inputData.contentHTML ||
                !inputData.contentMarkdown
            ) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            } else {
                await db.MarkDown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId
                });

                return resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            return reject(e);
        }
    });
};

const getDetailDoctor = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            } else {
                const doctor = await db.User.findOne({
                    where: { id: inputId, roleId: 'R2' },
                    attributes: {
                        exclude: [
                            'password',
                            'refreshToken',
                            'createdAt',
                            'updatedAt',
                            'gender'
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
                        },
                        {
                            model: db.MarkDown,
                            as: 'markdownData',
                            attributes: [
                                'description',
                                'contentHTML',
                                'contentMarkdown'
                            ]
                        }
                    ],
                    raw: false,
                    nest: true
                });

                if (!doctor) {
                    return resolve({
                        errCode: 2,
                        errMessage: 'Doctor not found'
                    });
                }

                return resolve({
                    errCode: 0,
                    message: 'OK',
                    data: doctor
                });
            }
        } catch (e) {
            return reject(e);
        }
    });
};

export {
    getTopDoctorsHome,
    getAllDoctors,
    saveDetailInfoDoctor,
    getDetailDoctor
};
