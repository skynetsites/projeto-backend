'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Tênis',
        slug: 'tenis',
        use_in_menu: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Casual',
        slug: 'casual',
        use_in_menu: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
