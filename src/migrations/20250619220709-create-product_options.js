'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_options', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      shape: {
        type: Sequelize.ENUM('square', 'circle'),
        defaultValue: 'square',
      },
      radius: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      type: {
        type: Sequelize.ENUM('text', 'color'),
        defaultValue: 'text',
      },
      values: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_options');
  }
};
