import { AppDataSource } from "../database/data-source";
import { Incident } from "../entities/incident";

const incidentRepository = AppDataSource.getRepository(Incident);

type TCreateIncident = {
  fullname:string;
  firstPhoneNumber:string;
  secondPhoneNumber?:string;
  observations:string;
  incidentType:string;
  associatedTeam:string;
  status:string;
  dateTime:Date;
};

export const createIncident = async (incidentEntity: TCreateIncident) => {
  const createdIncident = incidentRepository.create(incidentEntity);
  return await incidentRepository.save(createdIncident);
};
