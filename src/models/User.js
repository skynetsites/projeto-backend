// Importação do Sequelize e a conexão com o banco
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o model User com os campos da tabela users
const User = sequelize.define('User', {
  firstname: { type: DataTypes.STRING, allowNull: false },            // primeiro nome obrigatório
  surname: { type: DataTypes.STRING, allowNull: false },              // sobrenome obrigatório
  email: { type: DataTypes.STRING, allowNull: false, unique: true },  // email único e obrigatório
  password: { type: DataTypes.STRING, allowNull: false },             // senha obrigatória
}, {
  timestamps: true,                                                   // created_at e updated_at automáticos
  tableName: 'users'                                                  // nome da tabela no banco
});

 // exporta o model User
module.exports = User;

