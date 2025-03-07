import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import EmployeeManagement from "./pages/EmployeeManagement";
import Payroll from "./pages/Payroll";
import PerformanceManagement from "./pages/PerformanceManagement";
import Employee from "./pages/Employee";
import EmployeeEdit from "./pages/EmployeeEdit";
import EmployeeNew from "./pages/EmployeeNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/employees" element={<EmployeeManagement />} />
        <Route path="/employee/:id" element={<Employee />} />
        <Route path="/employee/new" element={<EmployeeNew />} />
        <Route path="/edit/:id" element={<EmployeeEdit />} />
        <Route path="/pagamento" element={<Payroll />} />
        <Route path="/desenpenho" element={<PerformanceManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
