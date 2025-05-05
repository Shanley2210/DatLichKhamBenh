import db from '../models/index';

const getAllCodes = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = {};

            if (!typeInput) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            } else {
                const allcode = await db.AllCode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.message = 'OK';
                res.data = allcode;
            }

            return resolve(res);
        } catch (e) {
            return reject(e);
        }
    });
};

export { getAllCodes };
