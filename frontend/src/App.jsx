import { BrowserRouter, Routes, Route} from "react-router-dom";
import Kpis from "./components/kpis/Kpis";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kpis" element={<Kpis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}



