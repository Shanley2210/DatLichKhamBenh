import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { configViewEngine } from './config/viewEngine.js';
import initWebRoutes from './routes/web.js';
import connectDB from './config/connectdb.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

initWebRoutes(app);

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
