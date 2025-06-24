'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstname: 'Isaias',
        surname: 'Oliveira',
        email: 'isaiaswebnet@gmail.com',
        password: await bcrypt.hash('123456', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        firstname: 'Admin',
        surname: 'User',
        email: 'admin@email.com',
        password: await bcrypt.hash('123456', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
