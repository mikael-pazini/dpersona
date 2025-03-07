import { useState, useEffect } from "react";
import { visibleFormatCPF } from "../utils/formatCPF";
import { visibleFormatRG } from "../utils/formatRG";
import { visibleFormatCEP } from "../utils/formatCEP";
import { formatToDisplay, formatToISOWithTimezone } from "../utils/formatDate";
import "./EmployeeEditDetail.css";

import { EmployeeType } from "../types";
import { updateEmployee, getEmployeeById } from "../services/employeeService";

interface EmployeeEditFormProps {
  employeeId: string;
  onUpdateSuccess: () => void;
  onCancel: () => void;
}

const EmployeeEditDetail: React.FC<EmployeeEditFormProps> = ({
  employeeId,
  onUpdateSuccess,
  onCancel,
}) => {
  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(employeeId);
        setEmployee(data);
        setBirthDate(formatToDisplay(data.birth)); // Exibe a data formatada
      } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  if (!employee) {
    return <p>Carregando...</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setEmployee({ ...employee, [name]: checked }); // Atualiza status como true/false
    } else if (name === "birth") {
      setBirthDate(value); // Atualiza o input de data sem formatar ainda
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedEmployee = {
        ...employee,
        birth: formatToISOWithTimezone(birthDate),
      }; // Converte a data antes de enviar
      await updateEmployee(employeeId, updatedEmployee);
      alert("Funcionário atualizado com sucesso!");
      onUpdateSuccess();
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    }
  };

  if (!employee) return null;

  return (
    <div className="container">
      <h2>Editar Funcionário</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Empresa:
          <input
            type="text"
            name="company"
            value={employee.company}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={visibleFormatCPF(employee.cpf)}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <div className="checkbox">
            <input
              type="checkbox"
              name="status"
              checked={employee.status}
              onChange={handleChange}
            />
            {employee.status ? " Ativo" : " Inativo"}
          </div>
        </label>
        <label>
          Data de Nascimento:
          <input
            type="text"
            name="birth"
            value={birthDate}
            onChange={handleChange}
            required
          />
          {}
        </label>
        <label>
          RG:
          <input
            type="text"
            name="rg"
            value={visibleFormatRG(employee.rg)}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          PIS:
          <input
            type="text"
            name="pis"
            value={employee.pis}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Endereço:
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CEP:
          <input
            type="text"
            name="cep"
            value={visibleFormatCEP(employee.cep)}
            onChange={handleChange}
            required
          />
        </label>

        <div className="button-group">
          <button type="submit" className="button button-save">
            Salvar
          </button>
          <button
            type="button"
            className="button button-cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEditDetail;
