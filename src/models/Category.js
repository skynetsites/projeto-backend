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

// Define o model Category
const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false },             // Nome da categoria (obrigatório)
  slug: { type: DataTypes.STRING, allowNull: false },             // Slug da categoria (obrigatório)
  use_in_menu: { type: DataTypes.BOOLEAN, defaultValue: false },  // Indica se aparece no menu
}, {
  timestamps: true,                                               // created_at e updated_at automáticos
  tableName: 'categories',                                        // Nome da tabela no banco
  hooks: {
    beforeValidate(category) {
      // Antes da validação, gera slug se não informado
      if (category.name && !category.slug) {
        category.slug = slugify(category.name);
      }
    }
  }
});

// exporta o model Category
module.exports = Category;
