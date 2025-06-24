// Importação do Express e cria a rota
const express = require('express');
const router = express.Router();

// Middleware de autenticação JWT
const auth = require('../middleware/auth');

// Controller de usuários
const userController = require('../controllers/userController');

// Rotas de Usuário
router.get('/:id', userController.getUserById);         // Buscar usuário por ID
router.post('/', userController.createUser);            // Criar novo usuário
router.put('/:id', auth, userController.updateUser);    // Atualizar usuário (requer login)
router.delete('/:id', auth, userController.deleteUser); // Deletar usuário (requer login)

// Exporta as rotas
module.exports = router;
