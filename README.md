# Digital Store API - Projeto Backend

Uma API RESTful completa para e-commerce desenvolvida como projeto final do Projeto Backend do curso Desenvolvedor Web Full Stack da Geração Tech do Instituto Euvaldo Lodi (IEL). A aplicação oferece uma solução robusta para gerenciamento de produtos, usuários, categorias e sistema de autenticação para lojas virtuais.

## 📋 Sobre o Projeto

Este projeto implementa uma API completa para e-commerce que demonstra domínio em desenvolvimento backend moderno, incluindo operações CRUD, autenticação segura, modelagem de dados e arquitetura escalável. A Digital Store API serve como base para qualquer aplicação de comércio eletrônico, fornecendo todos os recursos essenciais para gestão de produtos e usuários.

**Repositório de referência:** [https://github.com/digitalcollegebr/projeto-backend](https://github.com/digitalcollegebr/projeto-backend)

## 🛠️ Tecnologias usadas no Projeto

O projeto foi desenvolvido com um conjunto de tecnologias modernas do JavaScript, garantindo eficiência, segurança e facilidade na manutenção:

### Tecnologias Essenciais
- **Node.js** - Runtime JavaScript para desenvolvimento server-side
- **Express.js** - Framework web minimalista e flexível para Node.js
- **Sequelize** - ORM avançado para Node.js com excelente integração ao MySQL
- **MySQL** - Sistema de gerenciamento de banco de dados relacional robusto e amplamente utilizado

### Comunicação com Banco
- **MySQL2** - Driver MySQL nativo para Node.js com suporte a Promises

### Segurança & Autenticação
- **JSON Web Tokens (JWT)** - Sistema de autenticação baseado em tokens
- **Bcrypt.js** - Biblioteca para criptografia segura de senhas
- **CORS** - Configuração para requisições cross-origin

### Desenvolvimento & Testes
- **Nodemon** - Ferramenta para reinicialização automática durante desenvolvimento
- **Jest** - Framework de testes JavaScript
- **C8** - Framework de testes de saída e cobertura de código
- **Supertest** - Biblioteca para testes de APIs HTTP

## 🎯 Requisitos de Avaliação

### 1. Funcionalidades Essenciais
- Implementação completa dos endpoints especificados
- Operações CRUD para todas as entidades principais
- Sistema de autenticação e autorização robusto
- Tratamento adequado de erros e validações

### 2. Qualidade do Código
- Código limpo, comentado e bem estruturado
- Aplicação de boas práticas de desenvolvimento
- Arquitetura organizada seguindo padrões estabelecidos

### 3. Banco de Dados
- Modelagem eficiente e normalizada
- Implementação adequada de migrations
- Consultas otimizadas e relacionamentos bem definidos

### 4. Documentação
- Documentação completa da API
- Instruções claras de configuração
- Guias de uso e exemplos práticos

## 🔥 Principais Funcionalidades

### Gestão de Usuários
- Cadastro completo de usuários com validações
- Armazenamento seguro de credenciais com hash
- Sistema de autenticação via JWT
- Middleware de proteção para rotas privadas

### Gerenciamento de Produtos
- CRUD completo para produtos e suas variações
- Sistema de categorização flexível
- Gerenciamento de imagens e opções de produtos
- Busca avançada com múltiplos filtros

### Sistema de Categorias
- Organização hierárquica de produtos
- Operações completas de gerenciamento
- Associações dinâmicas com produtos

### Recursos Avançados
- Arquitetura em camadas (Controllers, Services, Models)
- Filtros de busca por nome, preço, categoria
- Servidor Express otimizado para alta performance
- Testes automatizados abrangentes

## 🌐 Endpoints da API

A API utiliza o prefixo /v1 para versionamento das rotas.

| Método   | Endpoint               | Descrição                            | 🔒 Autenticação |
| -------- | ---------------------- | ------------------------------------ | --------------- |
| `POST`   | `/user`                | Cadastro de novo usuário             | ❌ Não          |
| `POST`   | `/user/token`          | Autenticação e geração de token JWT  | ❌ Não          |
| `GET`    | `/user/:id`            | Consulta usuário por ID              | ❌ Não          |
| `PUT`    | `/user/:id`            | Atualização dos dados do usuário     | ✔️ Sim          |
| `DELETE` | `/user/:id`            | Deletar usuário                      | ✔️ Sim          |
| `POST`   | `/category`            | Cadastro de nova categoria           | ✔️ Sim          |
| `GET`    | `/category/search`     | Listagem de categorias com filtros   | ❌ Não          |
| `GET`    | `/category/slug/:slug` | Consulta de categoria por slug       | ❌ Não          |
| `GET`    | `/category/:id`        | Consulta de categoria por ID         | ❌ Não          |
| `PUT`    | `/category/:id`        | Atualizar dados da categoria         | ✔️ Sim          |
| `DELETE` | `/category/:id`        | Deletar categoria                    | ✔️ Sim          |
| `POST`   | `/product`             | Cadastro de produto completo         | ✔️ Sim          |
| `GET`    | `/product/search`      | Busca avançada de produtos           | ❌ Não          |
| `GET`    | `/product/slug/:slug`  | Consulta de produto por slug         | ❌ Não          |
| `GET`    | `/product/:id`         | Consulta de produto por ID           | ❌ Não          |
| `PUT`    | `/product/:id`         | Atualizar produto                    | ✔️ Sim          |
| `DELETE` | `/product/:id`         | Deletar produto                      | ✔️ Sim          |


## 🚀 Configuração e Execução

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **MySQL** instalado e configurado
- **Git** para clonagem do repositório

### Instalação

```bash
# Clone o repositório
git clone https://github.com/skynetsites/projeto-backend
cd projeto-backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Configure o banco MySQL
# Crie um banco de dados no MySQL
mysql -u root -p
CREATE DATABASE projeto_backend;

# Execute as migrations do banco
npm run migrate

# Inicie o servidor de desenvolvimento
npm run dev
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor Express com hot-reload
npm run start        # Inicia servidor Express de produção

# Banco de Dados
npm run migrate      # Executa migrations
npm run seed         # Popula banco com dados iniciais

# Testes
npm run coverage    # Relatório de cobertura
npm test            # Executa todos os testes
npm run watch       # Testes em modo watch
```

## 📁 Arquitetura do Projeto

```
project-root/
├── docs/                        # Documentação da API
├── src/                         # Diretório principal da API 
│   ├── __tests__/               # Testes automatizados
│   ├── assets/images/           # Imagens dos produtos
│   ├── config/                  # Configurações do Sequelize e DB
│   ├── controllers/             # Lógica dos endpoints
│   ├── middleware/              # Middlewares (auth, erros)
│   ├── migrations/              # Controle de criação de tabelas
│   ├── models/                  # Modelos Sequelize
│   ├── routes/                  # Definição das rotas
│   ├── seeders/                 # Dados iniciais para o banco
│   ├── services/                # Serviços auxiliares (JWT, Upload)
│   ├── sql/                     # Banco de dados MySQL
│   ├── app.js                   # Instância do Express
│   └── server.js                # Inicialização do servidor
├── .env                         # Variáveis de ambiente
├── .gitignore                   # Arquivos ignorados no Git
├── .sequelizerc                 # Configuração do Sequelize CLI
├── package.json                 # Configuração principal da API
└── README.md                    # Apresentação do projeto (Markdown)
```

## 🚀 Diagrama do banco de dados (SQL)

O diagrama relacional representando a estrutura e os relacionamentos do banco de dados.

![Descrição da Imagem](https://i.imgur.com/qKbP9Dv.png)

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido exclusivamente para fins educacionais como parte do curso de formação em Desenvolvedor Web Full Stack da Geração Tech do Instituto Euvaldo Lodi (IEL) e o Governo do Estado do Ceará por meio da Agência de Desenvolvimento do Estado do Ceará (ADECE) para capacitação de jovens na área da tecnologia.

---
## 👨‍💻 Autor

**Desenvolvido por:** Isaias Oliveira<br>
**Instituição:** Geração Tech | Instituto Euvaldo Lodi (IEL)<br>
**Curso:** Desenvolvedor Web Full Stack<br>
**Período:** 3 meses e 192 horas/aula<br>
**Créditos:** Projeto Geração Tech – Instituto Euvaldo Lodi (IEL)<br> 
```
