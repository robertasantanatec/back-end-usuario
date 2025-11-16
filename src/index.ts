import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/UsuarioRoutes.js";
import ocorrenciaRoutes from "./routes/OcorrenciaRoutes.js";
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const PROJECT_URL = process.env.PROJECT_URL || ""
const API_KEY = process.env.API_KEY || ""
export const supabase = createClient(PROJECT_URL, API_KEY)

 // Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/test-env", (req, res) => {
  res.json({
    supabase
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
