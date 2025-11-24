// src/controllers/UserController.js

const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    try {
      console.log('Dados recebidos no Controller (req.body):', req.body);
      const user = await UserService.register(req.body);
            
      // Retorno 200/201 é aceitável para criação
      return res.json(user); 
    } catch (err) {
      // 400 Bad Request para erros de validação ou dados (ex: email duplicado)
      return res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body; // Mudança para 'senha' no corpo
      const result = await UserService.login(email, senha);
      
      return res.json(result);
    } catch (err) {
      // 401 Unauthorized para falha de autenticação (credenciais inválidas)
      return res.status(401).json({ error: err.message });
    }
  },
  
  // Exemplo de uma rota protegida
  async profile(req, res) {
      // O userId foi adicionado pelo Middleware de autenticação
      const userId = req.userId;
      
      // Lógica para buscar os dados do perfil usando o userId
      // ...
      
      return res.json({ userId, message: "Acesso a rota protegida com sucesso!" });
  }
};