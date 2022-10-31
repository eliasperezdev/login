import sequelize from 'sequelize';

module.exports = {
  async up(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      name: 'admin',
      description: 'Administrator',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'user',
      description: 'User',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
  },
};