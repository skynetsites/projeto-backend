// Importação do Express e cria a rota
const express = require('express');
const router = express.Router();

// Middleware de autenticação
const auth = require('../middleware/auth');

// Controller de produtos
const productController = require('../controllers/productController');

// Rotas de Produto
router.get('/search', productController.searchProducts);         // Buscar lista de produtos com filtros
router.get('/slug/:slug', productController.getProductBySlug);   // Buscar produto por slug
router.get('/:id', productController.getProductById);            // Buscar produto por ID
router.post('/', auth, productController.createProduct);         // Criar produto (requer login)
router.put('/:id', auth, productController.updateProduct);       // Atualizar produto (requer login)
router.delete('/:id', auth, productController.deleteProduct);    // Deletar produto (requer login)

// Exporta as rotas
module.exports = router;


