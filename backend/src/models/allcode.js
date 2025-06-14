'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            AllCode.hasMany(models.User, {
                foreignKey: 'positionId',
                as: 'positionData'
            });
            AllCode.hasMany(models.User, {
                foreignKey: 'gender',
                as: 'genderData'
            });
            AllCode.hasMany(models.Schedule, {
                foreignKey: 'timeType',
                as: 'timeTypeData'
            });

            AllCode.hasMany(models.DoctorInfo, {
                foreignKey: 'priceId',
                as: 'priceTypeData'
            });
            AllCode.hasMany(models.DoctorInfo, {
                foreignKey: 'provinceId',
                as: 'provinceTypeData'
            });
            AllCode.hasMany(models.DoctorInfo, {
                foreignKey: 'paymentId',
                as: 'paymentTypeData'
            });
        }
    }
    AllCode.init(
        {
            key: DataTypes.STRING,
            type: DataTypes.STRING,
            valueEn: DataTypes.STRING,
            valueVi: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'AllCode'
        }
    );
    return AllCode;
};
