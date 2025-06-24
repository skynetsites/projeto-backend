// Importação dos models, Sequelize e moduls nativos
const { Product, ProductImage, ProductOption, Category } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Função utilitária para salvar imagem na pasta src/assets/images
const saveImage = (content, type) => {
  const buffer = Buffer.from(content, "base64");
  const filename = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${
    type.split("/")[1]
  }`;
  const folder = path.join(__dirname, "../assets/images"); // pasta atualizada

  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  const filepath = path.join(folder, filename);
  fs.writeFileSync(filepath, buffer);

  // Retorna o caminho que será usado para acessar via URL
  return `/assets/images/${filename}`;
};

module.exports = {
  // Buscar produtos com filtros
  async searchProducts(req, res) {
    const {
      limit = 12,
      page = 1,
      fields,
      match,
      category_ids,
      price_range,
      ...optionsFilters
    } = req.query;

    const where = {};

    if (match) {
      where[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } },
      ];
    }

    if (price_range) {
      const [min, max] = price_range.split("-").map(Number);
      where.price = { [Op.between]: [min, max] };
    }

    const include = [
      {
        model: Category,
        through: { attributes: [] },
        where: category_ids
          ? { id: { [Op.in]: category_ids.split(",").map(Number) } }
          : undefined,
        required: !!category_ids,
      },
      {
        model: ProductImage,
        attributes: ["id", "path"],
      },
      {
        model: ProductOption,
      },
    ];

    const total = await Product.count({ where, include });

    const attributes = fields ? fields.split(",") : undefined;

    const products = await Product.findAll({
      where,
      include,
      attributes,
      limit: limit == -1 ? undefined : parseInt(limit),
      offset: limit == -1 ? undefined : (parseInt(page) - 1) * parseInt(limit),
    });

    const data = products.map((product) => ({
      ...product.toJSON(),
      images: product.ProductImages.map((img) => ({
        id: img.id,
        content: img.path,
      })),
    }));

    return res.status(200).json({
      data,
      total,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  },

  // Buscar produto por ID
  async getProductById(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          through: { attributes: [] },
        },
        {
          model: ProductImage,
          attributes: ["id", "path"],
        },
        {
          model: ProductOption,
        },
      ],
    });

    if (!product)
      return res.status(404).json({ message: "Produto não encontrado" });

    const result = {
      ...product.toJSON(),
      images: product.ProductImages.map((img) => ({
        id: img.id,
        content: img.path,
      })),
    };

    return res.status(200).json(result);
  },

  // Buscar produto por slug
  async getProductBySlug(req, res) {
    const { slug } = req.params;

    const product = await Product.findOne({
      where: { slug },
      include: [
        {
          model: Category,
          through: { attributes: [] },
        },
        {
          model: ProductImage,
          attributes: ["id", "path"],
        },
        {
          model: ProductOption,
        },
      ],
    });

    if (!product)
      return res.status(404).json({ message: "Produto não encontrado" });

    const result = {
      ...product.toJSON(),
      images: product.ProductImages.map((img) => ({
        id: img.id,
        content: img.path,
      })),
    };

    return res.status(200).json(result);
  },

  // Criar produto
  async createProduct(req, res) {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids = [],
      images = [],
      options = [],
    } = req.body;

    if (
      !name ||
      !slug ||
      price === undefined ||
      price_with_discount === undefined
    ) {
      return res.status(400).json({ message: "Dados obrigatórios faltando" });
    }

    const product = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
    });

    // Categorias
    if (category_ids.length) {
      await product.setCategories(category_ids);
    }

    // Imagens
    for (const img of images) {
      const pathFile = saveImage(img.content, img.type);
      await ProductImage.create({ product_id: product.id, path: pathFile });
    }

    // Opções
    for (const opt of options) {
      await ProductOption.create({
        product_id: product.id,
        title: opt.title,
        shape: opt.shape ?? "square",
        radius: opt.radius ?? 0,
        type: opt.type ?? "text",
        values: Array.isArray(opt.values) ? opt.values.join(",") : opt.values,
      });
    }

    return res.status(201).json({ id: product.id, message: "Produto criado" });
  },

  // Atualizar produto
  async updateProduct(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [ProductImage, ProductOption],
    });

    if (!product)
      return res.status(404).json({ message: "Produto não encontrado" });

    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids = [],
      images = [],
      options = [],
    } = req.body;

    await product.update({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
    });

    // Atualizar categorias
    if (category_ids) {
      await product.setCategories(category_ids);
    }

    // Atualizar imagens
    for (const img of images) {
      if (img.deleted) {
        await ProductImage.destroy({ where: { id: img.id, product_id: id } });
      } else if (img.id) {
        // Apenas manter a imagem existente
      } else {
        const pathFile = saveImage(img.content, img.type);
        await ProductImage.create({ product_id: id, path: pathFile });
      }
    }

    // Atualizar opções
    for (const opt of options) {
      if (opt.deleted) {
        await ProductOption.destroy({ where: { id: opt.id, product_id: id } });
      } else if (opt.id) {
        await ProductOption.update(
          {
            title: opt.title,
            shape: opt.shape ?? "square",
            radius: opt.radius ?? 0,
            type: opt.type ?? "text",
            values: Array.isArray(opt.values)
              ? opt.values.join(",")
              : opt.values,
          },
          {
            where: { id: opt.id, product_id: id },
          }
        );
      } else {
        await ProductOption.create({
          product_id: id,
          title: opt.title,
          shape: opt.shape ?? "square",
          radius: opt.radius ?? 0,
          type: opt.type ?? "text",
          values: Array.isArray(opt.values) ? opt.values.join(",") : opt.values,
        });
      }
    }

    return res.status(204).send();
  },

  // Deletar produto
  async deleteProduct(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ message: "Produto não encontrado" });

    await product.destroy();

    return res.status(204).send();
  },
};
