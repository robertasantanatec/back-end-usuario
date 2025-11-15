/* import { Router } from "express";
import {
  listarOcorrencias,
  criarOcorrencia,
  FinalizarOcorrencia,
  editarOcorrencia,
  excluirOcorrencia,
} from "../controllers/OcorrenciaControllers.js";
import { autenticar } from "../middlewares/autenticar.js";

const router = Router();

// Todas as rotas de ocorrência requerem autenticação
router.get("/", autenticar, listarOcorrencias);
router.post("/", autenticar, criarOcorrencia);
router.put("/finalizar", autenticar, FinalizarOcorrencia);
router.put("/editar", autenticar, editarOcorrencia);
router.delete("/", autenticar, excluirOcorrencia);

export default router;
 */