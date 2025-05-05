import { getAllCodes } from '../services/allcodeService';

const getAllCode = async (req, res) => {
    try {
        const type = req.query.type;

        const data = await getAllCodes(type);

        return res.status(200).json(data);
    } catch (e) {
        console.log('getAllCodes error: ', e);
        return res
            .status(200)
            .json({ errCode: -1, errMessage: 'Error from server' });
    }
};

export { getAllCode };
