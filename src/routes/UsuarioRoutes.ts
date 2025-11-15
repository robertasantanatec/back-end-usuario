import { Router } from "express";
/* import {
  cadastrarUsuario,
  loginUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  alterarSenha,
  desativarUsuario,
  obterPerfilUsuario,
} from "../controllers/UsuarioController.ts"; */
import { autenticar } from "../middlewares/autenticar.js";

const router = Router();

// Rotas públicas (não requerem autenticação)
/* router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario); */

// Rotas protegidas (requerem autenticação)
/* router.get("/perfil", autenticar, obterPerfilUsuario);
router.get("/listar", autenticar, listarUsuarios);
router.get("/:id", autenticar, buscarUsuario);
router.put("/atualizar", autenticar, atualizarUsuario);
router.put("/alterar-senha", autenticar, alterarSenha);
router.delete("/:id", autenticar, desativarUsuario);

export default router; */
