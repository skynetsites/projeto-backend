// Importação do Sequelize e a conexão com o banco
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o model ProductOption com os campos da tabela product_options
const ProductOption = sequelize.define('ProductOption', {
  title: { type: DataTypes.STRING, allowNull: false },                          // título da opção
  shape: { type: DataTypes.ENUM('square', 'circle'), defaultValue: 'square' },  // formato
  radius: { type: DataTypes.INTEGER, defaultValue: 0 },                         // raio para bordas arredondadas
  type: { type: DataTypes.ENUM('text', 'color'), defaultValue: 'text' },        // tipo de opção
  values: { type: DataTypes.STRING, allowNull: false }                          // valores possíveis, separados por vírgula
}, {
  timestamps: false,                                                            // sem created_at e updated_at
  tableName: 'product_options'                                                  // nome da tabela no banco
});

// Exporta o model ProductOption
module.exports = ProductOption;

