import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import usuarioRoutes from "./routes/UsuarioRoutes.js";
import ocorrenciaRoutes from "./routes/OcorrenciaRoutes.js";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco conectado com sucesso!");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar banco:", err);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoint healthcheck
app.get("/healthz", (req, res) => {
  const dbReady = AppDataSource.isInitialized ? "ok" : "not_initialized";
  res.status(200).json({ status: "ok", database: dbReady });
});

app.get("/", async (req, res) => {
  res.json({
    message: "API CBMPE - Sistema de Ocorrências",
    version: "1.0.0",
    endpoints: {
      usuarios: "/api/usuarios",
      ocorrencias: "/api/ocorrencias",
    },
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
});

export default app;
