// src/routes/userRoutes.js

const { Router } = require("express");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/auth"); // Importa o Middleware

const router = Router();

// Rotas públicas (não precisam de token)
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Rota protegida (exige token válido)
router.get("/profile", authMiddleware, UserController.profile); 

module.exports = router;