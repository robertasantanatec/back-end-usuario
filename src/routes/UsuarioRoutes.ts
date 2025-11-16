import { Router } from "express";
import {
/*   cadastrarUsuario,
  loginUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  alterarSenha,
  desativarUsuario,
  obterPerfilUsuario, */
} from "../controllers/UsuarioController";
import { autenticar } from "../middlewares/autenticar.js";

const router = Router();

/* router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", autenticar, obterPerfilUsuario);
router.get("/listar", autenticar, listarUsuarios);
router.get("/:id", autenticar, buscarUsuario);
router.put("/atualizar", autenticar, atualizarUsuario);
router.put("/alterar-senha", autenticar, alterarSenha);
router.delete("/:id", autenticar, desativarUsuario); */

export default router;
