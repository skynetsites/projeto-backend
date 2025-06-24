// Importação do Sequelize e a conexão com o banco
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o model ProductImage com os campos da tabela product_images
const ProductImage = sequelize.define('ProductImage', {
  enabled: { type: DataTypes.BOOLEAN, defaultValue: false },  // indica se a imagem está ativa
  path: { type: DataTypes.STRING, allowNull: false },         // caminho da imagem (obrigatório)
}, {
  timestamps: false,                                          // sem created_at e updated_at
  tableName: 'product_images'                                 // nome da tabela no banco
});

// exporta o model ProductImage
module.exports = ProductImage;
