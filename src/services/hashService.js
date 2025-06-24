// Importação do bcrypt para hash e verificação de senhas
const bcrypt = require('bcrypt');

module.exports = {
  // Gera o hash da senha com fator de custo 10
  async hash(password) {
    return await bcrypt.hash(password, 10);
  },

  // Compara a senha informada com o hash armazenado
  async compare(password, hash) {
    return await bcrypt.compare(password, hash);
  }
};
