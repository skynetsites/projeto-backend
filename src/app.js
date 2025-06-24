// Importações de dependências principais: servidor, segurança, caminhos e variáveis de ambiente
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importações das rotas da aplicação
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const loginRoutes = require('./routes/loginRoutes');

// Inicializa a aplicação Express
const app = express();

// Habilita CORS para todas as rotas
app.use(cors());

// Suporte a JSON no body das requisições
app.use(express.json());

// Serve arquivos estáticos da pasta assets/images
app.use('/assets/images', express.static(path.join(__dirname, 'assets/images')));

// Rotas da API com versionamento v1
app.use('/v1/user', userRoutes);
app.use('/v1/category', categoryRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/login', loginRoutes);

// Rota raiz para teste de funcionamento da API
app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando perfeitamente!' });
});

// Exporta o app para uso em server.js ou testes
module.exports = app;