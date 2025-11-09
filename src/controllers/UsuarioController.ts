import type { Request, Response } from "express";
import { Usuario } from "../models/usuario.js";
import type {
  CadastroUsuarioRequestDTO,
  LoginUsuarioRequestDTO,
  AtualizarUsuarioRequestDTO,
  AlterarSenhaRequestDTO,
} from "../types/usuarioDTO.js";
import { toUsuarioResponseDTO } from "../utils/toUsuarioDTO.js";
import { gerarToken } from "../utils/jwtUtils.js";

/**
 * Cadastrar novo usuário
 */
export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, cpf, matricula } =
      req.body as CadastroUsuarioRequestDTO;

    // Validações básicas
    if (!nome || !email || !senha || !cpf || !matricula) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Remove caracteres especiais do CPF (caso venha formatado)
    const cpfLimpo = cpf.replace(/\D/g, "");

    // Verifica se CPF tem 11 dígitos
    if (cpfLimpo.length !== 11) {
      return res.status(400).json({ error: "CPF inválido" });
    }

    // Verifica se já existe usuário com esse email
    const usuarioExistenteEmail = await Usuario.findOne({ email });
    if (usuarioExistenteEmail) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Verifica se já existe usuário com esse CPF
    const usuarioExistenteCPF = await Usuario.findOne({ cpf: cpfLimpo });
    if (usuarioExistenteCPF) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    // Verifica se já existe usuário com essa matrícula
    const usuarioExistenteMatricula = await Usuario.findOne({ matricula });
    if (usuarioExistenteMatricula) {
      return res.status(400).json({ error: "Matrícula já cadastrada" });
    }

    // Cria novo usuário
    const novoUsuario = new Usuario({
      nome,
      email,
      senha, // Será hasheada automaticamente pelo middleware do model
      cpf: cpfLimpo,
      matricula,
    });

    await novoUsuario.save();

    // Gera token JWT
    const token = gerarToken({
      id: novoUsuario._id.toString(),
      email: novoUsuario.email,
      matricula: novoUsuario.matricula,
    });

    // Retorna usuário e token
    const resposta = toUsuarioResponseDTO(novoUsuario);
    res.status(201).json({
      usuario: resposta,
      token,
      message: "Usuário cadastrado com sucesso",
    });
  } catch (err: any) {
    console.error("Erro ao cadastrar usuário:", err);
    
    // Erros de validação do Mongoose
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e: any) => e.message);
      return res.status(400).json({ error: errors.join(", ") });
    }

    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

/**
 * Login de usuário
 */
export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body as LoginUsuarioRequestDTO;

    // Validações básicas
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Busca usuário pelo email (incluindo senha)
    const usuario = await Usuario.findOne({ email }).select("+senha");

    if (!usuario) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    // Verifica se usuário está ativo
    if (!usuario.ativo) {
      return res.status(401).json({ error: "Usuário inativo" });
    }

    // Compara senha
    const senhaCorreta = await usuario.compararSenha(senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    // Gera token JWT
    const token = gerarToken({
      id: usuario._id.toString(),
      email: usuario.email,
      matricula: usuario.matricula,
    });

    // Retorna usuário e token
    const resposta = toUsuarioResponseDTO(usuario);
    res.json({
      usuario: resposta,
      token,
      message: "Login realizado com sucesso",
    });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

/**
 * Listar todos os usuários
 */
export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find({ ativo: true });
    const resposta = usuarios.map(toUsuarioResponseDTO);
    res.json(resposta);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

/**
 * Buscar usuário por ID
 */
export const buscarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const resposta = toUsuarioResponseDTO(usuario);
    res.json(resposta);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

/**
 * Atualizar dados do usuário
 */
export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id, nome, email, cpf, matricula } =
      req.body as AtualizarUsuarioRequestDTO;

    if (!id) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualiza campos fornecidos
    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (cpf) usuario.cpf = cpf.replace(/\D/g, "");
    if (matricula) usuario.matricula = matricula;

    await usuario.save();

    const resposta = toUsuarioResponseDTO(usuario);
    res.json({
      usuario: resposta,
      message: "Usuário atualizado com sucesso",
    });
  } catch (err: any) {
    console.error("Erro ao atualizar usuário:", err);

    // Erros de duplicação (email, cpf ou matrícula já existentes)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ error: `${field} já cadastrado` });
    }

    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

/**
 * Alterar senha do usuário
 */
export const alterarSenha = async (req: Request, res: Response) => {
  try {
    const { id, senhaAtual, novaSenha } = req.body as AlterarSenhaRequestDTO;

    if (!id || !senhaAtual || !novaSenha) {
      return res.status(400).json({ 
        error: "ID, senha atual e nova senha são obrigatórios" 
      });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({ 
        error: "Nova senha deve ter no mínimo 6 caracteres" 
      });
    }

    // Busca usuário com senha
    const usuario = await Usuario.findById(id).select("+senha");

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica senha atual
    const senhaCorreta = await usuario.compararSenha(senhaAtual);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha atual incorreta" });
    }

    // Atualiza senha (será hasheada automaticamente)
    usuario.senha = novaSenha;
    await usuario.save();

    res.json({ message: "Senha alterada com sucesso" });
  } catch (err) {
    console.error("Erro ao alterar senha:", err);
    res.status(500).json({ error: "Erro ao alterar senha" });
  }
};

/**
 * Desativar usuário (soft delete)
 */
export const desativarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    usuario.ativo = false;
    await usuario.save();

    res.json({ message: "Usuário desativado com sucesso" });
  } catch (err) {
    console.error("Erro ao desativar usuário:", err);
    res.status(500).json({ error: "Erro ao desativar usuário" });
  }
};

/**
 * Obter dados do usuário autenticado
 */
export const obterPerfilUsuario = async (req: Request, res: Response) => {
  try {
    // req.usuario foi populado pelo middleware de autenticação
    if (!req.usuario) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const usuario = await Usuario.findById(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const resposta = toUsuarioResponseDTO(usuario);
    res.json(resposta);
  } catch (err) {
    console.error("Erro ao obter perfil:", err);
    res.status(500).json({ error: "Erro ao obter perfil do usuário" });
  }
};
