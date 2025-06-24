// Importação das bibliotecas e app
const request = require('supertest');
const app = require('../app');

describe('Verificação do status da aplicação', () => {
  // Testa se a rota raiz '/' responde com status 200 e uma mensagem
  it('Deve retornar status 200 na rota raiz', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message'); // Verifica se a resposta tem a propriedade 'message'
  });
});

