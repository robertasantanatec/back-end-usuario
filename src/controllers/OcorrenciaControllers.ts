import type { Request, Response } from "express";
import type {
  DeleteOcorrenciaRequestDTO,
  EditOcorrenciaRequestDTO,
  OcorrenciaRequestDTO,
} from "../types/ocorrenciaResponseDTO";
import { toOcorrenciaResponseDTO } from "../utils/toOcorrenciaDTO";
import { createIncident } from "../repository/incident";
import { Incident } from "../entities/incident";

export const criarOcorrencia = async (req: Request, res: Response) => {
  try {
    const {
      fullname,
      firstPhoneNumber,
      secondPhoneNumber,
      observations,
      incidentType,
      associatedTeam,
      status,
      dateTime,
    } = req.body;/*   as OcorrenciaRequestDTO */

    const newIncidentDTO = {
      fullname,
      firstPhoneNumber,
      secondPhoneNumber,
      observations,
      incidentType,
      associatedTeam,
      status,
      dateTime,
    };

    let newIncidentEntity = new Incident();

    newIncidentEntity.fullname = newIncidentDTO.fullname;
    newIncidentEntity.firstPhoneNumber = newIncidentDTO.firstPhoneNumber;
    newIncidentEntity.secondPhoneNumber = newIncidentDTO.secondPhoneNumber;
    newIncidentEntity.observations = newIncidentDTO.observations;
    newIncidentEntity.incidentType = newIncidentDTO.incidentType;
    newIncidentEntity.associatedTeam = newIncidentDTO.associatedTeam;
    newIncidentEntity.status = newIncidentDTO.status;
    newIncidentEntity.dateTime = newIncidentDTO.dateTime;

    const response = await createIncident(newIncidentEntity);

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar ocorrência" });
  }
};

/* export const listarOcorrencias = async (req: Request, res: Response) => {
  try {
    const ocorrencias = await Ocorrencia.find();
    const resposta = ocorrencias.map(toOcorrenciaResponseDTO);
    res.json(resposta);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar ocorrências" });
  }
};



export const FinalizarOcorrencia = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const ocorrencia = await Ocorrencia.findById(id);
    if (!ocorrencia) {
      return res.status(404).json({ error: "Ocorrência não encontrada" });
    }
    ocorrencia.Status = "Finalizada";
    await ocorrencia.save();
    const resposta = toOcorrenciaResponseDTO(ocorrencia);
    res.json(resposta);
  } catch (err) {
    res.status(500).json({ error: "Erro ao finalizar ocorrência" });
  }
};

export const editarOcorrencia = async (req: Request, res: Response) => {
  try {
    const { id, Telefone1, Telefone2, Obs } =
      req.body as EditOcorrenciaRequestDTO;

    if (!id) {
      return res.status(400).json({ error: "ID da ocorrência não fornecido" });
    }

    const ocorrencia = await Ocorrencia.findById(id);
    if (!ocorrencia) {
      return res.status(404).json({ error: "Ocorrência não encontrada" });
    }

    ocorrencia.Telefone1 = Telefone1;
    ocorrencia.Telefone2 = Telefone2 ?? "";
    ocorrencia.Obs = Obs;

    await ocorrencia.save();

    const resposta = toOcorrenciaResponseDTO(ocorrencia);
    res.json(resposta);
  } catch (err) {
    console.error("Erro ao editar ocorrência:", err);
    res.status(500).json({ error: "Erro ao editar ocorrência" });
  }
};

export const excluirOcorrencia = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as DeleteOcorrenciaRequestDTO;
    const ocorrencia = await Ocorrencia.findById(id);
    if (!ocorrencia) {
      return res.status(404).json({ error: "Ocorrência não encontrada" });
    }
    await ocorrencia.deleteOne();
    res.json({ message: "Ocorrência excluída com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir ocorrência:", err);
    res.status(500).json({ error: "Erro ao excluir ocorrência" });
  }
}; */
