const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bookingcarefake', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

export default connectDB;
