import { useParams, useNavigate } from "react-router-dom";
import EmployeeEditDetail from "../components/EmployeeEditDetail";
import Header from "../components/Header";

const EmployeeEdit = () => {
  const { id } = useParams<{ id: string }>(); // Pegando o ID da URL
  const navigate = useNavigate();

  const handleUpdateSuccess = () => {
    alert("Funcionário atualizado com sucesso!");
    navigate(`/employee/${id}`); // Redireciona para a página do funcionário
  };

  return (
    <>
      <Header />
      {id ? (
        <EmployeeEditDetail
          employeeId={id}
          onUpdateSuccess={handleUpdateSuccess}
          onCancel={() => navigate(-1)}
        />
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default EmployeeEdit;
