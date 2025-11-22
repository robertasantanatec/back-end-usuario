import { AppDataSource } from "../database/data-source";
import { Incident } from "../entities/incident";

const incidentRepository = AppDataSource.getRepository(Incident);

export const createIncident = async (incidentEntity) => {
  const createdIncident = incidentRepository.create(incidentEntity);
  return await incidentRepository.save(createdIncident);
};
