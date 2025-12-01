import type { Request, Response } from "express";
import type {
  CadastroUsuarioRequestDTO,
  LoginUsuarioRequestDTO,
  AtualizarUsuarioRequestDTO,
  AlterarSenhaRequestDTO,
} from "../types/usuarioDTO";
import { toUsuarioResponseDTO } from "../utils/toUsuarioDTO";
import { gerarToken } from "../utils/jwtUtils";
import { User } from "../entities/User";
import { cleanCpf } from "../utils/strings";
import bcryp from "bcryptjs";
import {
  createUser,
  findByCpf,
  findByEmail,
  findByEnrollmentNumber,
} from "../repository/user";

export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    const {
      fullname,
      cpf,
      birthDate,
      gender,
      phoneNumber,
      email,
      enrollmentNumber,
      post,
      unity,
      specialization,
      passwordHash,
      address,
      profileImage,
      isActive,
    } = req.body as CadastroUsuarioRequestDTO;

    if (!fullname || !email || !passwordHash || !cpf || !enrollmentNumber) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const newUserDTO = {
      fullname,
      cpf,
      birthDate,
      gender,
      phoneNumber,
      email,
      enrollmentNumber,
      post,
      unity,
      specialization,
      address,
      profileImage,
      isActive,
    };

    const newUserEntity = new User();

    const encryptedPassword = await bcryp.hash(passwordHash, 8);

    const cleanedCpf = cleanCpf(cpf);
    if (cleanedCpf.length !== 11) {
      return res.status(400).json({ error: "CPF inválido" });
    }

    const existentUserEmail = await findByEmail(email);
    if (existentUserEmail) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const existentUserCpf = await findByCpf(cleanedCpf);
    if (existentUserCpf) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    const existentUserEnrollmentNumber = await findByEnrollmentNumber(
      enrollmentNumber
    );
    if (existentUserEnrollmentNumber) {
      return res.status(400).json({ error: "Matrícula já cadastrada" });
    }

    newUserEntity.gender = newUserDTO.gender;
    newUserEntity.address = newUserDTO.address;
    newUserEntity.birthDate = newUserDTO.birthDate;
    newUserEntity.cpf = newUserDTO.cpf;
    newUserEntity.email = newUserDTO.email;
    newUserEntity.enrollmentNumber = newUserDTO.enrollmentNumber;
    newUserEntity.fullname = newUserDTO.fullname;
    newUserEntity.phoneNumber = newUserDTO.phoneNumber;
    newUserEntity.post = newUserDTO.post;
    newUserEntity.profileImage = newUserDTO.profileImage;
    newUserEntity.specialization = newUserDTO.specialization;
    newUserEntity.unity = newUserDTO.unity;
    newUserEntity.isActive = newUserDTO.isActive;
    newUserEntity.setPasswordHash(encryptedPassword);

    const newUser = await createUser(newUserEntity);

    console.log({ newUser });

    const token = gerarToken({
      id: newUser?.id?.toString() ?? "",
      email: newUser.email,
      enrollmentNumber: newUser.enrollmentNumber,
    });

    res.status(201).json({
      usuario: newUser,
      token,
      message: "Usuário cadastrado com sucesso",
    });
  } catch (err: any) {
    console.error("Erro ao cadastrar usuário:", err);

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e: any) => e.message);
      return res.status(400).json({ error: errors.join(", ") });
    }

    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginUsuarioRequestDTO;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const userEntity = await findByEmail(email).then((response) => response);

    const { passwordHash } = userEntity ?? {};

    const isCorrectPassword = bcryp.compare(password, passwordHash as string);

    if (!userEntity) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    if (!userEntity.isActive) {
      return res.status(401).json({ error: "Usuário inativo" });
    }

    if (!isCorrectPassword) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const token = gerarToken({
      id: userEntity?.id?.toString() ?? "",
      email: userEntity.email,
      enrollmentNumber: userEntity.enrollmentNumber,
    });

    res.json({
      token,
      message: "Login realizado com sucesso",
    });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

/* export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find({ ativo: true });
    const resposta = usuarios.map(toUsuarioResponseDTO);
    res.json(resposta);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
}; */

/* 

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

    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ error: `${field} já cadastrado` });
    }

    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};


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

    const usuario = await Usuario.findById(id).select("+senha");

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaCorreta = await usuario.compararSenha(senhaAtual);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha atual incorreta" });
    }

    usuario.senha = novaSenha;
    await usuario.save();

    res.json({ message: "Senha alterada com sucesso" });
  } catch (err) {
    console.error("Erro ao alterar senha:", err);
    res.status(500).json({ error: "Erro ao alterar senha" });
  }
};


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


export const obterPerfilUsuario = async (req: Request, res: Response) => {
  try {
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
}; */
