// Importação das bibliotecas e app
const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');

let token;       // Token JWT de autenticação
let productId;   // ID do produto criado

// Antes de todos os testes, reseta o banco e gera um token
beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Cria um usuário para autenticação
  await request(app)
    .post('/v1/user')
    .send({
      firstname: 'Test',
      surname: 'User',
      email: 'test@email.com',
      password: '123456',
      confirmPassword: '123456'
    });

  // Faz login para gerar o token
  const res = await request(app)
    .post('/v1/user/token')
    .send({
      email: 'test@email.com',
      password: '123456'
    });

  token = res.body.token;
});

// Após todos os testes, fecha conexão com o banco
afterAll(async () => {
  await sequelize.close();
});

describe('Endpoints de produto', () => {

  // Teste: criar produto
  it('vai criar um novo produto', async () => {
    const res = await request(app)
      .post('/v1/product')
      .set('Authorization', `Bearer ${token}`)
      .send({
        enabled: true,
        name: 'Test Product',
        slug: 'test-product',
        stock: 100,
        description: 'Test description',
        price: 200,
        price_with_discount: 100,
        category_ids: [],
        images: [],
        options: []
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    productId = res.body.id;
  });

  // Teste: buscar produto por ID
  it('vai listar o produto por id', async () => {
    const res = await request(app)
      .get(`/v1/product/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test Product');
  });

  // Teste: atualizar produto
  it('vai atualizar o produto', async () => {
    const res = await request(app)
      .put(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        enabled: true,
        name: 'Updated Test Product',
        slug: 'updated-test-product',
        stock: 150,
        description: 'Updated test description',
        price: 250,
        price_with_discount: 150,
        category_ids: [],
        images: [],
        options: []
      });
    expect(res.statusCode).toEqual(204);
  });

  // Teste: excluir produto
  it('vai excluir o produto', async () => {
    const res = await request(app)
      .delete(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
