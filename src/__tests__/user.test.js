// Importação das bibliotecas e app
const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');

// Antes de todos os testes, zera o banco
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Após todos os testes, fecha conexão com o banco
afterAll(async () => {
  await sequelize.close();
});

describe('Endpoints de usuário', () => {
  let userId;
  let token;

  // Teste: criar um novo usuário
  it('vai criar um novo usuário', async () => {
    const res = await request(app)
      .post('/v1/user')
      .send({
        firstname: 'Test',
        surname: 'User',
        email: 'test@email.com',
        password: '123456',
        confirmPassword: '123456'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  // Teste: login e gerar token JWT
  it('vai fazer login e receber um token', async () => {
    const res = await request(app)
      .post('/v1/user/token')
      .send({
        email: 'test@email.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  // Teste: buscar usuário pelo ID
  it('vai listar o usuário por id', async () => {
    const res = await request(app)
      .get(`/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'test@email.com');
  });

  // Teste: atualizar usuário
  it('vai atualizar o usuário', async () => {
    const res = await request(app)
      .put(`/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'Admin',
        surname: 'User',
        email: 'admin@email.com'
      });
    expect(res.statusCode).toEqual(204);
  });

  // Teste: excluir usuário
  it('vai excluir o usuário', async () => {
    const res = await request(app)
      .delete(`/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});

