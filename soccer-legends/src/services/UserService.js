// src/services/UserService.js

const { Usuario } = require("../../models"); // Usando "Usuario" conforme definido no Model
const bcrypt = require("bcrypt"); // Certifique-se de que o bcrypt está importado aqui
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  async register(data) {
    try {
      // 1. LÓGICA DE CRIPTOGRAFIA MOVIDA PARA O SERVICE (Solução anterior)
      if (data.senha) {
        data.senhaCriptografada = await bcrypt.hash(data.senha, 10);
        delete data.senha;
      }

      // Cria o usuário no banco
      const newUser = await Usuario.create(data);

      // 2. FILTRAGEM DE CAMPOS PARA O RETORNO (Novo!)

      // Converte o objeto Sequelize para um objeto JavaScript simples
      const userData = newUser.get({ plain: true });

      // Desestrutura e exclui o campo senhaCriptografada e o token
      const { senhaCriptografada, ...userSafe } = userData;

      // Retorna apenas os dados seguros do usuário
      return userSafe;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("O e-mail fornecido já está em uso.");
      }
      throw error;
    }
  },

  /**
   * Realiza o login, verifica a senha e gera o JWT.
   */
  async login(email, senha) {
    const user = await Usuario.findOne({ where: { email } });

    // 1. Verifica se o usuário existe OU se a senha está incorreta
    if (!user || !(await user.checkPassword(senha))) {
      throw new Error("Credenciais inválidas");
    }

    // 2. Gera o JWT
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    // 3. Prepara o retorno: remove o hash de senha
    const userData = user.get({ plain: true });
    const { senhaCriptografada, ...userSafe } = userData;

    return {
      message: "Login realizado com sucesso",
      user: userSafe,
      token,
    };
  },

  async getUserProfile(userId) {
    const user = await Usuario.findByPk(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const userData = user.get({ plain: true });
    const { senhaCriptografada, ...userSafe } = userData;
    return userSafe;
  }
};
