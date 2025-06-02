'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                id: 1,
                email: 'shanley@admin.com',
                password:
                    '$2y$10$TPqUpEik3.fUmeHBID3sQ.d3v09BSoSH1IiHCbRmt9ULbyALt.CPu',
                refreshToken: '',
                firstName: 'Admin',
                lastName: 'Shanley',
                phoneNumber: '0123456789',
                address: 'Hồ Chí Minh',
                gender: 1,
                image: 'https://www.w3schools.com/howto/img_avatar.png',
                roleId: 'R1',
                positionId: 'P0',

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
