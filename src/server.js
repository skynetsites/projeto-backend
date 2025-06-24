// Importação do app e do sequelize
const app = require('./app');
const { sequelize } = require('./models');

// Definição da porta
const PORT = process.env.PORT || 3000;

// Sincronização automática desativada (recomendado usar migrations)
// Use apenas em ambiente de desenvolvimento, se necessário
// sequelize.sync({ alter: true });

// Para atualizar o banco de dados use migrations:
// npx sequelize-cli db:migrate

// Testa a conexão com o banco
sequelize.authenticate().then(() => {
  console.log('Banco de dados conectado com sucesso!');

  // Inicia o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});
