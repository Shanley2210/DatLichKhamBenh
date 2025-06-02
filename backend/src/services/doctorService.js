import db from '../models/index';
import dotenv from 'dotenv';
import moment from 'moment';
import _, { at, includes } from 'lodash';
import { Op } from 'sequelize';

dotenv.config();

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
                !inputData.contentMarkdown ||
                !inputData.action
            ) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            } else {
                if (inputData.action === 'CREATE') {
                    await db.MarkDown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    });
                } else if (inputData.action === 'EDIT') {
                    const markDown = await db.MarkDown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    });

                    if (markDown) {
                        markDown.contentHTML = inputData.contentHTML;
                        markDown.contentMarkdown = inputData.contentMarkdown;
                        markDown.description = inputData.description;
                        await markDown.save();
                    }
                }

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

const createAppointmentPlan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            }

            const arrPlan = [];

            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    arrPlan.push({
                        doctorId: data[i].doctorId,
                        date: data[i].date,
                        timeType: data[i].time,
                        maxNumber: process.env.MAX_NUMBER
                    });
                }
            }

            const existingSchedules = await db.Schedule.findAll({
                where: {
                    [Op.or]: arrPlan.map((item) => ({
                        doctorId: item.doctorId,
                        date: item.date,
                        timeType: item.timeType
                    }))
                },
                attributes: ['doctorId', 'date', 'timeType', 'maxNumber']
            });

            const toCreate = _.differenceWith(
                arrPlan,
                existingSchedules,
                (a, b) => {
                    return (
                        a.doctorId === b.doctorId &&
                        a.timeType === b.timeType &&
                        moment(Number(a.date)).isSame(Number(b.date), 'day')
                    );
                }
            );

            if (toCreate <= 0) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Data input invalid'
                });
            }

            if (toCreate && toCreate.length > 0) {
                await db.Schedule.bulkCreate(toCreate);
            }

            return resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (e) {
            return reject(e);
        }
    });
};

const getScheduleDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            }

            const dataSchedule = await db.Schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: date
                },
                include: [
                    {
                        model: db.AllCode,
                        as: 'timeTypeData',
                        attributes: ['valueEn', 'valueVi']
                    }
                ],
                raw: true,
                nest: true
            });

            if (!dataSchedule || dataSchedule.length === 0) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Data not found'
                });
            }

            return resolve({
                errCode: 0,
                message: 'OK',
                data: dataSchedule
            });
        } catch (e) {
            return reject(e);
        }
    });
};

export {
    getTopDoctorsHome,
    getAllDoctors,
    saveDetailInfoDoctor,
    getDetailDoctor,
    createAppointmentPlan,
    getScheduleDate
};
