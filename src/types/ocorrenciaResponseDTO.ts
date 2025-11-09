export interface OcorrenciaRequestDTO {
  NomeCompleto: string;
  Telefone1: string;
  Telefone2?: string;
  Obs: string;
  TipoOcorrencia: string;
  EquipeAssociada?: string;
}

export interface EditOcorrenciaRequestDTO {
  id: string;
  Telefone1: string;
  Telefone2?: string;
  Obs: string;
}

export interface DeleteOcorrenciaRequestDTO {
  id: string;
}

export interface OcorrenciaResponseDTO {
  id: string;
  NomeCompleto: string;
  Telefone1: string;
  Telefone2?: string;
  Obs: string;
  TipoOcorrencia: string;
  EquipeAssociada: string;
  Status: string;
  data_hora: Date;
}
