import { Router } from "express";
import {
/*   listarOcorrencias,
  criarOcorrencia,
  FinalizarOcorrencia,
  editarOcorrencia,
  excluirOcorrencia, */
} from "../controllers/OcorrenciaControllers.ts";
import { autenticar } from "../middlewares/autenticar.js";

const router = Router();

/* router.get("/", autenticar, listarOcorrencias);
router.post("/", autenticar, criarOcorrencia);
router.put("/finalizar", autenticar, FinalizarOcorrencia);
router.put("/editar", autenticar, editarOcorrencia);
router.delete("/", autenticar, excluirOcorrencia); */

export default router;
