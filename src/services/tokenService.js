// Importação do jsonwebtoken para gerar e validar tokens
const jwt = require('jsonwebtoken');

// Carrega as variáveis de ambiente
require('dotenv').config();

module.exports = {
  // Gera um token JWT com validade de 1 dia
  generate(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  },

  // Valida e decodifica um token JWT
  validate(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};
