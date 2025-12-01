import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

type TCreateUser = {
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
};

export const createUser = async (UserEntity: TCreateUser) => {
  const createdUser = userRepository.create(UserEntity);
  return await userRepository.save(createdUser);
};

export const findByEmail = async (email: string) => {
  return await userRepository.findOne({ where: { email } });
};

export const findByCpf = async (cpf: string) => {
  return await userRepository.findOne({ where: { cpf } });
};

export const findByEnrollmentNumber = async (enrollmentNumber: string) => {
  return await userRepository.findOne({
    where: { enrollmentNumber },
  });
};
