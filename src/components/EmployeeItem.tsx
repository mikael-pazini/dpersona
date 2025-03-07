import "./EmployeeItem.css";
import { Link } from "react-router-dom";

import { formatCPF } from "../utils/formatCPF";
import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import { EmployeeType } from "../types";

// Componente
const EmployeeItem: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.company.toLowerCase().includes(searchLower) ||
      employee.name.toLowerCase().includes(searchLower) ||
      formatCPF(employee.cpf).includes(searchTerm) ||
      (searchLower === "ativo" && employee.status) ||
      (searchLower === "inativo" && !employee.status)
    );
  });

  return (
    <>
      <div className="container">
        <h1>Funcionários</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Buscar por empresa, nome, CPF ou status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/employee/new" className="link">
            <button className="button button-edit">Novo Funcionário</button>
          </Link>
        </div>

        <div className="card-description">
          <p>EMPRESA</p>
          <p>NOME</p>
          <p>CPF</p>
          <p>STATUS</p>
        </div>
        <div className="list-card-employee">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <Link
                to={`/employee/${employee._id}`}
                className="link"
                key={employee._id}
              >
                <div className="card-employee">
                  <p>{employee.company}</p>
                  <p>{employee.name}</p>
                  <p>{formatCPF(employee.cpf)}</p>
                  <p>{employee.status ? "Ativo" : "Inativo"}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>Nenhum funcionário encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeItem;
