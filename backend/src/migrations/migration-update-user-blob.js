module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.MEDIUMBLOB,
                allowNull: true
            })
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.MEDIUMBLOB,
                allowNull: true
            })
        ]);
    }
};
