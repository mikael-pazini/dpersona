export interface EmployeeType {
  _id?: string; // Opcional, pois ao criar um novo funcionário, ainda não há ID
  name: string;
  company: string;
  cpf: string;
  status: boolean;
  birth: string;
  rg: string;
  pis: string;
  address: string;
  cep: string;
}
