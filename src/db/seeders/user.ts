import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

module.exports = {
  async up(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    const userId = (await queryInterface.rawSelect(
      'roles',
      {
        where: {
          name: 'user',
        },
      },
      ['id'],
    ));
    const adminId = (await queryInterface.rawSelect('roles', {
      where: {
        name: 'admin',
      },
    }, ['id']));

    const adminUsers = [{
      name: 'admin',
      email: 'admin@admin.com',
      password: (await bcrypt.hash('admin', 10)),
      created_at: new Date(),
      updated_at: new Date(),
      role_id: adminId,
    },
    {
      name: 'admin2',
      email: 'admin2@admin.com',
      password: (await bcrypt.hash('admin2', 10)),
      created_at: new Date(),
      updated_at: new Date(),
      role_id: adminId,
    }];
    const normalUsers = [{
      name: 'user',
      email: 'user@user.com',
      password: (await bcrypt.hash('user', 10)),
      created_at: new Date(),
      updated_at: new Date(),
      role_id: userId,
    },
    {
      name: 'user2',
      email: 'user2@user.com',
      password: (await bcrypt.hash('user2', 10)),
      created_at: new Date(),
      updated_at: new Date(),
      role_id: userId,
    }];

    await queryInterface.bulkInsert('users', adminUsers, {});
    await queryInterface.bulkInsert('users', normalUsers, {});
  },

  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
  },
};