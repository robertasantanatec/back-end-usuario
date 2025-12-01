export const cleanCpf = (cpf: string) => {
  return cpf.replace(/\D/g, "");
};
