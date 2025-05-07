import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            errCode: 1,
            errMessage: 'No authentication token'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                errCode: 1,
                errMessage: 'Token has expired'
            });
        }

        return res.status(401).json({
            errCode: 1,
            errMessage: 'Invalid token'
        });
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.roleID === 'R1') {
            next();
        } else {
            return res.status(403).json({
                errCode: 1,
                errMessage: 'You do not have permission to perform this action'
            });
        }
    });
};

const verifyDoctor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.roleID === 'R2') {
            next();
        } else {
            return res.status(403).json({
                errCode: 1,
                errMessage: 'You do not have permission to perform this action'
            });
        }
    });
};

const verifyPatient = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.roleID === 'R3') {
            next();
        } else {
            return res.status(403).json({
                errCode: 1,
                errMessage: 'You do not have permission to perform this action'
            });
        }
    });
};

const verifyAdminOrDoctor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.roleID === 'R1' || req.user.roleID === 'R2') {
            next();
        } else {
            return res.status(403).json({
                errCode: 1,
                errMessage: 'You do not have permission to perform this action'
            });
        }
    });
};

const verifySelfOrAdmin = async (req, res, next) => {
    verifyToken(req, res, async () => {
        const userId = req.query.id || req.body.id;

        if (req.user.roleID === 'R1') {
            next();
            return;
        }

        if (req.user.userID.toString() === userId.toString()) {
            next();
            return;
        }

        return res.status(403).json({
            errCode: 1,
            errMessage: 'You do not have permission to perform this action'
        });
    });
};

export {
    verifyToken,
    verifyAdmin,
    verifyDoctor,
    verifyPatient,
    verifyAdminOrDoctor,
    verifySelfOrAdmin
};
