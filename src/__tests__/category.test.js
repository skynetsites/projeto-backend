// Importação das bibliotecas e app
const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

let token;       // Token JWT de autenticação
let categoryId;  // ID da categoria criada

// Antes de todos os testes, reseta o banco e gera token
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

  // Faz login para gerar token
  const res = await request(app)
    .post('/v1/user/token')
    .send({
      email: 'test@email.com',
      password: '123456'
    });

  token = res.body.token;
});

// Após todos os testes, fecha a conexão com o banco
afterAll(async () => {
  await sequelize.close();
});

describe('Endpoints de categoria', () => {

  // Teste: criar categoria
  it('vai criar uma nova categoria', async () => {
    const res = await request(app)
      .post('/v1/category')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Categoria',
        slug: 'categoria',
        use_in_menu: true
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.message).toBe('Categoria criada com sucesso');
    categoryId = res.body.id;
  });

  // Teste: buscar categoria por ID
  it('vai buscar a categoria por ID', async () => {
    const res = await request(app)
      .get(`/v1/category/${categoryId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', categoryId);
    expect(res.body).toHaveProperty('name', 'Categoria');
  });

  // Teste: buscar lista de categorias com filtro
  it('vai buscar categorias com filtro', async () => {
    const res = await request(app)
      .get('/v1/category/search?use_in_menu=true');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.total).toBeGreaterThanOrEqual(1);
  });

  // Teste: atualizar categoria
  it('vai atualizar a categoria', async () => {
    const res = await request(app)
      .put(`/v1/category/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Categoria Atualizada',
        slug: 'categoria-atualizado',
        use_in_menu: false
      });

    expect(res.statusCode).toEqual(204);
  });

  // Teste: deletar categoria
  it('vai excluir a categoria', async () => {
    const res = await request(app)
      .delete(`/v1/category/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });

});
