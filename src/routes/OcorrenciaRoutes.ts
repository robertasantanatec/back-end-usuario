import { Router } from "express";
import {
    criarOcorrencia,

/*   listarOcorrencias,
  FinalizarOcorrencia,
  editarOcorrencia,
  excluirOcorrencia, */
} from "../controllers/OcorrenciaControllers";
import { autenticar } from "../middlewares/autenticar.js";

const router = Router();

router.post("/",/*  autenticar, */ criarOcorrencia);

/* router.get("/", autenticar, listarOcorrencias);
router.post("/", autenticar, criarOcorrencia);
router.put("/finalizar", autenticar, FinalizarOcorrencia);
router.put("/editar", autenticar, editarOcorrencia);
router.delete("/", autenticar, excluirOcorrencia); */

export default router;
