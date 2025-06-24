// Importação do model User e bibliotecas
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  // Buscar usuário pelo ID
  async getUserById(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'firstname', 'surname', 'email'] // Seleciona apenas campos públicos
    });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  },

  // Criar usuário com validação e senha criptografada
  async createUser(req, res) {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    // Verifica campos obrigatórios
    if (!firstname || !surname || !email || !password || !confirmPassword)
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

    // Verifica se senhas conferem
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'As senhas não conferem' });

    // Verifica se e-mail já está cadastrado
    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(400).json({ message: 'E-mail já cadastrado' });

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco
    const user = await User.create({
      firstname,
      surname,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso', id: user.id });
  },

  // Atualizar dados do usuário
  async updateUser(req, res) {
    const { id } = req.params;
    const { firstname, surname, email } = req.body;

    // Busca o usuário para atualizar
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Atualiza campos permitidos
    await user.update({ firstname, surname, email });

    return res.status(204).send(); // Sem conteúdo na resposta
  },

  // Deletar usuário
  async deleteUser(req, res) {
    const { id } = req.params;

    // Busca o usuário para deletar
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    await user.destroy();

    return res.status(204).send(); // Sem conteúdo na resposta
  }
};
