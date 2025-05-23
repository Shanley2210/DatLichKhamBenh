import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { configViewEngine } from './config/viewEngine.js';
import initWebRoutes from './routes/web.js';
import connectDB from './config/connectdb.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

configViewEngine(app);

initWebRoutes(app);

app.use((req, res) => {
    res.status(404).json({
        errCode: 404,
        errMessage: 'Endpoint not found!'
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        errCode: -100,
        message: 'Something went wrong!'
    });
});

const startServer = async () => {
    try {
        await connectDB();

        const port = process.env.PORT || 3001;

        app.listen(port, () => {
            console.log(`Backend Node.js is running on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
