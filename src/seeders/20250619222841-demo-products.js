'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        enabled: true,
        name: 'K-Swiss V8 - Masculino',
        slug: 'k-swiss-v8-masculino',
        use_in_menu: true,
        stock: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 200,
        price_with_discount: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        enabled: true,
        name: 'Nike Air Force One - Masculino',
        slug: 'nike-air-force-one-masculino',
        use_in_menu: true,
        stock: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 200,
        price_with_discount: 150,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
