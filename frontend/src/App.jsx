import { BrowserRouter, Routes, Route} from "react-router-dom";
import Kpis from "./components/kpis/Kpis";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kpis" element={<Kpis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}



