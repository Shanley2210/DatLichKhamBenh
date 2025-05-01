'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'admin@gmail.com',
                password: '123456',
                firstName: 'Nguyễn Hiếu',
                lastName: 'Shanley',
                phoneNumber: '0123456789',
                address: 'Hồ Chí Minh',
                gender: 1,
                image: 'https://www.w3schools.com/howto/img_avatar.png',
                roleId: 'R1',

                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
