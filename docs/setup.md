# ⚙️ Configuração do Projeto

## Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL

## Passos para rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/skynetsites/projeto-backend
cd projeto-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env`:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha
DB_NAME=projeto_backend
JWT_SECRET=sua_chave_secreta
PORT=3000
```

4. Rode as migrations:
```bash
npx sequelize-cli db:migrate
```

5. (Opcional) Popule o banco com seeders:
```bash
npx sequelize-cli db:seed:all
```

6. Inicie o servidor:
```bash
npm run dev
```

Acesse: http://localhost:3000