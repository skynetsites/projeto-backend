// Importação do Sequelize e a conexão com o banco
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Função simples para gerar slug amigável a partir do nome
function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')                 // Separa letras e acentos
    .replace(/[\u0300-\u036f]/g, '')  // Remove os acentos
    .replace(/[^a-z0-9 ]/g, '')       // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-');            // Substitui espaços por hífens
}

// Define o model Product com seus campos e configurações
const Product = sequelize.define('Product', {
  enabled: { type: DataTypes.BOOLEAN, defaultValue: false },        // Produto ativo/inativo
  name: { type: DataTypes.STRING, allowNull: false },               // Nome do produto
  slug: { type: DataTypes.STRING, allowNull: false },               // Slug para URLs amigáveis
  use_in_menu: { type: DataTypes.BOOLEAN, defaultValue: false },    // Aparece no menu?
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },              // Quantidade em estoque
  description: { type: DataTypes.STRING },                          // Descrição curta
  price: { type: DataTypes.FLOAT, allowNull: false },               // Preço padrão
  price_with_discount: { type: DataTypes.FLOAT, allowNull: false }  // Preço com desconto
}, {
  timestamps: true,                                                 // created_at, updated_at automáticos
  tableName: 'products',                                            // Nome da tabela no banco
  hooks: {
    beforeValidate: (product) => {
      // Gera slug automaticamente se não informado
      if (product.name && !product.slug) {
        product.slug = slugify(product.name);
      }
    }
  }
});

// exporta o model Product
module.exports = Product;
