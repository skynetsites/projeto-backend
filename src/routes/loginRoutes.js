// Importação do Express e cria a rota
const express = require('express');
const router = express.Router();

// Importa o controller de login
const loginController = require('../controllers/loginController');

// Gera token JWT (login)
router.post('/token', loginController.generateToken);

// Exporta a rota
module.exports = router;

