// Importação do Sequelize e as variáveis do arquivo .env
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Cria uma instância do Sequelize com dados do .env
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nome do banco
  process.env.DB_USER,     // Usuário
  process.env.DB_PASSWORD, // Senha
  {
    host: process.env.DB_HOST,       // Host do banco
    port: process.env.DB_PORT || 3306, // Porta (padrão 3306 se não tiver no .env)
    dialect: 'mysql',                 // Dialeto MySQL
    logging: false,                   // Desativa logs SQL no terminal
    define: {
      underscored: true               // Usa snake_case nas colunas (created_at, updated_at)
    }
  }
);

// 🔗 Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados com sucesso.'))
  .catch(err => console.error('Falha na conexão com o banco de dados: ', err));

// Exporta a conexão para uso nos models
module.exports = sequelize;


