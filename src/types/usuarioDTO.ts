// DTOs para requests
export interface CadastroUsuarioRequestDTO {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  matricula: string;
}

export interface LoginUsuarioRequestDTO {
  email: string;
  senha: string;
}

export interface AtualizarUsuarioRequestDTO {
  id: string;
  nome?: string;
  email?: string;
  cpf?: string;
  matricula?: string;
}

export interface AlterarSenhaRequestDTO {
  id: string;
  senhaAtual: string;
  novaSenha: string;
}

// DTOs para responses
export interface UsuarioResponseDTO {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  matricula: string;
  dataCadastro: Date;
  ativo: boolean;
}

export interface LoginResponseDTO {
  usuario: UsuarioResponseDTO;
  token: string;
  message: string;
}
