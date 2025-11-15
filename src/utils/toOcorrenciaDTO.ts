import type { OcorrenciaResponseDTO } from "../types/ocorrenciaResponseDTO.js";

interface Iocorrencias extends Document {
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
    id: ocorrencia._id.toString(),
    NomeCompleto: ocorrencia.NomeCompleto,
    Telefone1: ocorrencia.Telefone1,
    Telefone2: ocorrencia.Telefone2,
    Obs: ocorrencia.Obs,
    TipoOcorrencia: ocorrencia.TipoOcorrencia,
    EquipeAssociada: ocorrencia.EquipeAssociada,
    Status: ocorrencia.Status,
    data_hora: ocorrencia.data_hora,
  };
}
