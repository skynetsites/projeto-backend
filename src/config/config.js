// Carrega as variáveis do arquivo .env
require('dotenv').config();

module.exports = {
  // Configuração para ambiente de desenvolvimento
  development: {
    username: process.env.DB_USER || 'root',            // Usuário do banco
    password: process.env.DB_PASS || 'root',            // Senha
    database: process.env.DB_NAME || 'projeto_backend', // Nome do banco
    host: process.env.DB_HOST || 'localhost',           // Host
    dialect: 'mysql'                                    // Dialeto MySQL
  },

  // Configuração para ambiente de teste (usado em testes automatizados)
  test: {
    username: 'root',
    password: 'root',
    database: 'projeto_backend',
    host: 'localhost',
    dialect: 'mysql'
  },

  // Configuração para ambiente de produção
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};

