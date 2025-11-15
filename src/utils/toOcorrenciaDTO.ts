import type { OcorrenciaResponseDTO } from "../types/ocorrenciaResponseDTO.js";

export function toOcorrenciaResponseDTO(
  ocorrencia
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
