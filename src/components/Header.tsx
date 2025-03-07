import "./Header.css";
import logo from "../assets/logo/dp_logo.png";
import { Link } from "react-router";
const Header = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img className="logo" src={logo} alt="logo" />
        <h1>D. PERSONA</h1>
      </Link>
      <div className="navbar-list">
        <Link to="/employees" className="navbar-item">
          Gestão de Funcinários
        </Link>
        <Link to="/pagamento" className="navbar-item">
          Folha de Pagamento
        </Link>
        <Link to="/desenpenho" className="navbar-item">
          Gestão de Desempenho
        </Link>
      </div>
    </nav>
  );
};

export default Header;
