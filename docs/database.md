# 🗄 Banco de Dados

## Modelo Relacional

- users (usuários)
- categories (categorias)
- products (produtos)
- product_images (imagens dos produtos)
- product_options (opções dos produtos)
- product_categories (relação produtos-categorias)

## 🔗 Relacionamentos

- products ➝ product_images (1:N)
- products ➝ product_options (1:N)
- products ⇄ categories (N:M via product_categories)

## 📜 Migrations
Use:
```bash
npx sequelize-cli db:migrate
```

## 🌱 Seeders
Execute:
```bash
npx sequelize-cli db:seed:all
```