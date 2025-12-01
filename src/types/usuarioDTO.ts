// DTOs para requests
export interface CadastroUsuarioRequestDTO {
  fullname: string;
  cpf: string;
  birthDate: Date;
  gender: "M" | "F";
  phoneNumber: string;
  email: string;
  enrollmentNumber: string;
  post: string;
  unity: string;
  specialization: string;
  address: {
    postOfficeBox: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
  };
  passwordHash: string;
  profileImage: string;
  isActive: boolean;
}

export interface LoginUsuarioRequestDTO {
  email: string;
  password: string;
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
