const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    try {
      const user = await UserService.register(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      return res.json(result);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }
};
