// Importação do Sequelize e a conexão com o banco
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o model ProductCategory para relacionamento muitos-para-muitos entre as tabelas products e categories
const ProductCategory = sequelize.define('ProductCategory', {}, {
  timestamps: false,               // sem colunas created_at e updated_at
  tableName: 'product_categories'  // nome correto da tabela (plural)
});

// exporta o model ProductCategory
module.exports = ProductCategory;
