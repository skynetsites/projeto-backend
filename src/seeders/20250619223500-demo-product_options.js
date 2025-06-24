'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_options', [
      {
        product_id: 1,
        title: 'Tamanho',
        shape: 'square',
        radius: 15,
        type: 'text',
        values: '39,40,41,42,43',
      },
      {
        product_id: 2,
        title: 'Cor',
        shape: 'circle',
        radius: 50,
        type: 'color',
        values: '#6feeff,#c93d82,#5e5e5e,#6d70b7',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_options', null, {});
  },
};
