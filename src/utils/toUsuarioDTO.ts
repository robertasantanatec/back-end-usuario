import type { UsuarioResponseDTO } from "../types/usuarioDTO.js";

export function toUsuarioResponseDTO(usuario): UsuarioResponseDTO {
  return {
    id: usuario._id.toString(),
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf,
    matricula: usuario.matricula,
    dataCadastro: usuario.dataCadastro,
    ativo: usuario.ativo,
  };
}
