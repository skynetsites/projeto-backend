'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_images', [
      {
        product_id: 1,
        enabled: true,
        path: 'assets/images/tenis-kswis.png',
      },
      {
        product_id: 2,
        enabled: true,
        path: 'assets/images/tenis-nike.png',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', null, {});
  },
};
