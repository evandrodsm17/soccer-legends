// app.js
const express = require("express");
const cors = require("cors");
const db = require('../models'); // importa todos os models e o sequelize

const routes = require("./routes"); // Arquivo index.js dentro de /src/routes

const app = express();

// ======= Middlewares globais =======
app.use(cors());                // Libera acesso externo
app.use(express.json());        // JSON no corpo da requisição

// ======= Rotas =======
app.use("/", routes);

// ======= 404 handler =======
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Rota não encontrada"
  });
});

// ======= Tratamento global de erros =======
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  return res.status(500).json({
    error: "Erro interno do servidor",
    details: err.message,
  });
});

// iniciar o servidor e sincronizar banco
db.sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado!');
  })
  .catch((err) => console.error('Erro ao sincronizar banco:', err));

module.exports = app;
