import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usuarioRoutes from "./routes/UsuarioRoutes.js";
import ocorrenciaRoutes from "./routes/OcorrenciaRoutes.js";

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cbmpe";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });

// Rotas
app.get("/", (req, res) => {
  res.json({ 
    message: "API CBMPE - Sistema de Ocorrências",
    version: "1.0.0",
    endpoints: {
      usuarios: "/api/usuarios",
      ocorrencias: "/api/ocorrencias"
    }
  });
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ocorrencias", ocorrenciaRoutes);

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});

export default app;
