// Importação do model User e bibliotecas
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  // Geração de token (login)
  async generateToken(req, res) {
    const { email, password } = req.body;

    // Validação dos campos
    if (!email || !password)
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });

    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: 'E-mail ou senha inválidos' });

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: 'E-mail ou senha inválidos' });

    // Gera token JWT válido por 1 dia
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Retorna o token para o cliente
    return res.status(200).json({ token });
  }
};

