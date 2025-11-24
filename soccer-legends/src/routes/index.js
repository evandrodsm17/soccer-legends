// src/routes/index.js
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

router.use("/usuarios", require("./user.routes"));

router.use(authMiddleware);

module.exports = router;
