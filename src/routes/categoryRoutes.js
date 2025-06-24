// Importa o Express e cria o rota
const express = require('express');
const router = express.Router();

// Middleware de autenticação
const auth = require('../middleware/auth');

// Controller de categoria
const categoryController = require('../controllers/categoryController');

router.get('/search', categoryController.searchCategories);      // Buscar lista de categorias com filtros
router.get('/slug/:slug', categoryController.getCategoryBySlug); // Buscar categoria pelo slug
router.get('/:id', categoryController.getCategoryById);          // Buscar categoria pelo ID
router.post('/', auth, categoryController.createCategory);       // Criar nova categoria (Autenticado)
router.put('/:id', auth, categoryController.updateCategory);     // Atualizar categoria (Autenticado)
router.delete('/:id', auth, categoryController.deleteCategory);  // Deletar categoria (Autenticado)

// Exporta as rotas
module.exports = router;


