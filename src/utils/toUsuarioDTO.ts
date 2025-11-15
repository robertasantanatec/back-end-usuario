import type { UsuarioResponseDTO } from "../types/usuarioDTO.js";

interface IUsuario extends Document {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  matricula: string;
  dataCadastro: Date;
  ativo: boolean;
  compararSenha(senhaFornecida: string): Promise<boolean>;
}

export function toUsuarioResponseDTO(usuario: IUsuario): UsuarioResponseDTO {
  return {
    id: usuario.id.toString(),
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf,
    matricula: usuario.matricula,
    dataCadastro: usuario.dataCadastro,
    ativo: usuario.ativo,
  };
}
