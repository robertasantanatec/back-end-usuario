import type { OcorrenciaResponseDTO } from "../types/ocorrenciaResponseDTO";

interface Iocorrencias extends Document {
  id: number;
  NomeCompleto: string;
  Telefone1: string;
  Telefone2?: string;
  Obs: string;
  TipoOcorrencia: string;
  EquipeAssociada: string;
  Status: string;
  data_hora: Date;
}

export function toOcorrenciaResponseDTO(
  ocorrencia: Iocorrencias
): OcorrenciaResponseDTO {
  return {
    id: ocorrencia.id.toString(),
    NomeCompleto: ocorrencia.NomeCompleto,
    Telefone1: ocorrencia.Telefone1,
    Telefone2: ocorrencia?.Telefone2,
    Obs: ocorrencia.Obs,
    TipoOcorrencia: ocorrencia.TipoOcorrencia,
    EquipeAssociada: ocorrencia.EquipeAssociada,
    Status: ocorrencia.Status,
    data_hora: ocorrencia.data_hora,
  };
}
