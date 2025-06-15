'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorInfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DoctorInfo.belongsTo(models.User, {
                foreignKey: 'doctorId',
                as: 'doctorInfoData'
            });

            DoctorInfo.belongsTo(models.AllCode, {
                foreignKey: 'priceId',
                targetKey: 'key',
                as: 'priceTypeData'
            });
            DoctorInfo.belongsTo(models.AllCode, {
                foreignKey: 'provinceId',
                targetKey: 'key',
                as: 'provinceTypeData'
            });
            DoctorInfo.belongsTo(models.AllCode, {
                foreignKey: 'paymentId',
                targetKey: 'key',
                as: 'paymentTypeData'
            });
        }
    }
    DoctorInfo.init(
        {
            doctorId: DataTypes.INTEGER,
            priceId: DataTypes.STRING,
            provinceId: DataTypes.STRING,
            paymentId: DataTypes.STRING,
            addressClinic: DataTypes.STRING,
            nameClinic: DataTypes.STRING,
            note: DataTypes.TEXT,
            count: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'DoctorInfo',
            freezeTableName: true
        }
    );
    return DoctorInfo;
};
