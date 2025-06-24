// Importação do JSON Web Tokens e do arquivo .env
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  // Pega o token do header Authorization (Bearer token)
  const authHeader = req.headers.authorization;

  // Se não enviou token, retorna erro 401
  if (!authHeader)
    return res.status(401).json({ message: "Token não enviado" });

  // Desestrutura para pegar só o token (formato: "Bearer token")
  const [, token] = authHeader.split(" ");

  try {
    // Verifica se o token é válido com a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Coloca o id do usuário decodificado na requisição para usar depois
    req.userId = decoded.id;

    // Segue para próxima função/middleware
    next();
  } catch (err) {
    // Se o token é inválido ou expirou, retorna erro 401
    return res.status(401).json({ message: "Token inválido" });
  }
};
