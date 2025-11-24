// src/middlewares/auth.js

const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // Verifica o formato Bearer
  const parts = authHeader.split(" ");
  
  if (parts.length !== 2) {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Formato de token malformado" });
  }

  try {
    // Verifica o token usando a chave secreta
    const decoded = jwt.verify(token, authConfig.secret);
    
    // Adiciona o ID do usuário à requisição para uso posterior nos Controllers
    req.userId = decoded.id; 
    
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};