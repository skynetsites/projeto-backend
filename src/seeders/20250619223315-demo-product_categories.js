'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', [
      {
        product_id: 1, // K-Swiss V8 - Masculino
        category_id: 1, // Tênis
      },
      {
        product_id: 2, // Nike Air Force One - Masculino
        category_id: 2, // Casual
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {});
  },
};
