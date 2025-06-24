// Importação do model Category e da biblioteca Sequelize
const { Category } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  // Buscar lista de categorias com filtros, paginação e campos específicos
  async searchCategories(req, res) {
    const { limit = 12, page = 1, fields, use_in_menu } = req.query;

    const where = {};
    if (use_in_menu !== undefined) {
      where.use_in_menu = use_in_menu === 'true';
    }

    const attributes = fields ? fields.split(',') : undefined;

    const total = await Category.count({ where });

    const options = {
      where,
      attributes
    };

    if (limit != -1) {
      options.limit = parseInt(limit);
      options.offset = (parseInt(page) - 1) * parseInt(limit);
    }

    const data = await Category.findAll(options);

    return res.status(200).json({
      data,
      total,
      limit: parseInt(limit),
      page: parseInt(page)
    });
  },

  // Buscar categoria por ID
  async getCategoryById(req, res) {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category)
      return res.status(404).json({ message: 'Categoria não encontrada' });

    return res.status(200).json(category);
  },

  // Buscar categoria por slug
  async getCategoryBySlug(req, res) {
    const { slug } = req.params;

    const category = await Category.findOne({ where: { slug } });

    if (!category)
      return res.status(404).json({ message: 'Categoria não encontrada' });

    return res.status(200).json(category);
  },

  // Criar uma nova categoria
  async createCategory(req, res) {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: 'Nome e slug são obrigatórios' });
    }

    const category = await Category.create({
      name,
      slug,
      use_in_menu: use_in_menu ?? false
    });

    return res.status(201).json({
      id: category.id,
      message: 'Categoria criada com sucesso'
    });
  },

  // Atualizar categoria existente
  async updateCategory(req, res) {
    const { id } = req.params;
    const { name, slug, use_in_menu } = req.body;

    const category = await Category.findByPk(id);

    if (!category)
      return res.status(404).json({ message: 'Categoria não encontrada' });

    await category.update({
      name,
      slug,
      use_in_menu
    });

    return res.status(204).send();
  },

  // Deletar categoria
  async deleteCategory(req, res) {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category)
      return res.status(404).json({ message: 'Categoria não encontrada' });

    await category.destroy();

    return res.status(204).send();
  }
};
