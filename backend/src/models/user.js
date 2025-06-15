'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.AllCode, {
                foreignKey: 'positionId',
                targetKey: 'key',
                as: 'positionData'
            });
            User.belongsTo(models.AllCode, {
                foreignKey: 'gender',
                targetKey: 'key',
                as: 'genderData'
            });
            User.hasOne(models.MarkDown, {
                foreignKey: 'doctorId',
                as: 'markdownData'
            });
            User.hasOne(models.DoctorInfo, {
                foreignKey: 'doctorId',
                as: 'doctorInfoData'
            });
        }
    }
    User.init(
        {
            email: DataTypes.INTEGER,
            password: DataTypes.STRING,
            refreshToken: DataTypes.TEXT,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING,
            gender: DataTypes.STRING,
            image: DataTypes.STRING,
            roleId: DataTypes.STRING,
            positionId: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'User'
        }
    );
    return User;
};
