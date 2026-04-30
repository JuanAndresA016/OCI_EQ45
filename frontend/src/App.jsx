import { BrowserRouter, Routes, Route } from "react-router-dom";
import Kpis from "./components/kpis/Kpis";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Proyecto from "./components/proyecto/Proyecto";
import TareaHija from "./components/tareaHija/TareaHija";
import ProyectoMember from "./components/proyectoMember/proyectoMember";
import ProyectoMemberHijo from "./components/proyectoMemberHijo/proyectoMemberHijo";
import KpisProyect from "./components/kpisProject/KpisProyect";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kpis" element={<Kpis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proyecto/:proyecto_id" element={<Proyecto />} />
        <Route path="/proyecto/:proyecto_id/tarea/:tarea_id" element={<TareaHija />} />
        <Route path="/proyecto_miembro/:proyecto_id" element={<ProyectoMember />}/>
        <Route path="/proyecto_miembro/:proyecto_id/tarea/:tarea_id" element={<ProyectoMemberHijo />}/>
        <Route path="/proyecto-kpi/:proyectoId" element={<KpisProyect />}/>
      </Routes>
    </BrowserRouter>
  );
}