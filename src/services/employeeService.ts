import axios from "axios";
import { EmployeeType } from "../types";
import dotenv from "dotenv";

dotenv.config();
// const API_URL = "http://localhost:5000/api/employees"; // URL da API // Usado para projeto local
const API_URL = import.meta.env.VITE_API_URL as string; // Lê a variável do .env

// 📌 Buscar todos os funcionários
export const getEmployees = async (): Promise<EmployeeType[]> => {
  const response = await axios.get<EmployeeType[]>(API_URL);
  return response.data;
};

// 📌 Buscar funcionário por ID
export const getEmployeeById = async (id: string): Promise<EmployeeType> => {
  const response = await axios.get<EmployeeType>(`${API_URL}/${id}`);
  return response.data;
};

// 📌 Criar novo funcionário
export const createEmployee = async (
  employeeData: EmployeeType
): Promise<EmployeeType> => {
  const response = await axios.post<EmployeeType>(API_URL, employeeData);
  return response.data;
};

// 📌 Atualizar funcionário
export const updateEmployee = async (
  id: string,
  employeeData: EmployeeType
): Promise<EmployeeType> => {
  const response = await axios.put<EmployeeType>(
    `${API_URL}/${id}`,
    employeeData
  );
  return response.data;
};

// 📌 Deletar funcionário
export const deleteEmployee = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
