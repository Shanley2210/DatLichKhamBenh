import { getTopDoctorsHome } from '../services/doctorService';

const getDoctorHome = async (req, res) => {
    const limit = req.query.limit ? req.query.limit : 10;

    try {
        const doctors = await getTopDoctorsHome(+limit);

        return res.status(200).json(doctors);
    } catch (e) {
        console.log('get home doctor error: ', e);

        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

export { getDoctorHome };
