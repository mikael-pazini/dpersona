import "./EmployeeDetail.css";
import { useParams, useNavigate } from "react-router-dom";

import { formatCPF } from "../utils/formatCPF";
import { formatRG } from "../utils/formatRG";
import { formatCEP } from "../utils/formatCEP";
import { format, parseISO } from "date-fns";
import { deleteEmployee, getEmployees } from "../services/employeeService";
import { EmployeeType } from "../types";
import { useEffect, useState } from "react";

const EmployeeDetail = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employee: EmployeeType | undefined = employees.find(
    (emp) => emp._id === id
  );

  // Se não encontrar o funcionário, exibe uma mensagem
  if (!employee) {
    return <div className="container">Funcionário não encontrado.</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/edit/${employee._id}`);
  };

  const handleDelete = async () => {
    if (!employee || !employee._id) {
      alert("Erro: Funcionário inválido.");
      return;
    }

    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar este funcionário?"
    );

    if (confirmDelete) {
      try {
        await deleteEmployee(employee._id); // Agora garantimos que _id é string
        alert("Funcionário deletado com sucesso!");
        navigate("/employees");
      } catch (error) {
        console.error("Erro ao deletar funcionário:", error);
        alert("Erro ao deletar funcionário.");
      }
    }
  };

  return (
    <div className="container">
      <div className="detail-nav">
        <button className="button button-back" onClick={handleBack}>
          voltar
        </button>

        <div className="nav-button">
          <button className="button button-edit" onClick={handleEdit}>
            Editar
          </button>
          <button className="button button-delete" onClick={handleDelete}>
            Deletar
          </button>
        </div>
      </div>
      <ul className="detail-list">
        <li className="detail-item">
          <div className="detail-name">ID:</div>
          <div className="detail-value">{employee._id}</div>
        </li>
        <li className="detail-item">
          <div className="detail-name">Empresa:</div>
          <div className="detail-value">{employee.company}</div>
        </li>
        <li className="detail-item">
          <div className="detail-name">Nome:</div>
          <div className="detail-value">{employee.name}</div>
        </li>
        <li className="detail-item">
          <div className="detail-name">CPF:</div>
          <div className="detail-value">{formatCPF(employee.cpf)}</div>
        </li>
        <li className="detail-item">
          <div className="detail-name">Status:</div>
          <div className="detail-value">
            {employee.status ? "Ativo" : "Inativo"}
          </div>
        </li>
        <li className="detail-item">
          <div className="detail-name">Data de Nascimento:</div>
          <div className="detail-value">
            {format(parseISO(employee.birth), "dd/MM/yyyy")}
          </div>
        </li>
        <li className="detail-item">
          <div className="detail-name">RG:</div>
          <div className="detail-value">{formatRG(employee.rg)}</div>
        </li>
        <li className="detail-item">
          <div className="detail-name">PIS:</div>
          <div className="detail-value">{employee.pis}</div>
        </li>
        <li className="detail-item">
          <div className="detail-name">Endereço:</div>
          <div className="detail-value">{employee.address}</div>
        </li>
        <li className="detail-item">
          <div className="detail-name">CEP:</div>
          <div className="detail-value">{formatCEP(employee.cep)}</div>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeDetail;
