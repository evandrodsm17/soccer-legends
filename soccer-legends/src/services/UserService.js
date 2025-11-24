const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  async register(data) {
    return User.create(data);
  },

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.checkPassword(password))) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      { id: user.id }, 
      authConfig.secret, 
      { expiresIn: authConfig.expiresIn }
    );


    // Remover hash antes de enviar
    const userSafe = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      message: "Login realizado com sucesso",
      user: userSafe,
      token
    };
  },
};
