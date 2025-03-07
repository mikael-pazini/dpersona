import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/employeeService";
import { formatDateToGMT3 } from "../utils/formatDate"; // Formata a data corretamente
import { visibleFormatCPF } from "../utils/formatCPF";
import { visibleFormatRG } from "../utils/formatRG";
import { visibleFormatCEP } from "../utils/formatCEP";

const EmployeeCreate: React.FC = () => {
  const navigate = useNavigate();

  // Estado do funcionário
  const [employee, setEmployee] = useState({
    name: "",
    company: "",
    cpf: "",
    status: true,
    birth: "",
    rg: "",
    pis: "",
    address: "",
    cep: "",
  });

  // Manipulação de mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Função para salvar o funcionário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Se o campo de data estiver vazio, evita erro
    if (!employee.birth) {
      alert("Por favor, preencha a data de nascimento corretamente.");
      return;
    }

    try {
      const formattedEmployee = {
        ...employee,
        birth: formatDateToGMT3(employee.birth), // Agora garantimos que a conversão é segura
      };

      await createEmployee(formattedEmployee);
      alert("Funcionário cadastrado com sucesso!");
      navigate("/employees");
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      alert("Erro ao cadastrar funcionário.");
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Novo Funcionário</h2>
      <form onSubmit={handleSubmit} className="create-form">
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
            type="date"
            name="birth"
            value={employee.birth}
            onChange={handleChange}
            required
          />
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
            onClick={() => navigate("/employees")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeCreate;
