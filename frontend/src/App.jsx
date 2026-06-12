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
import TaskCalendar from "./components/taskcalendar/TaskCalendar";
import Calendar from "./components/calendar/Calendar";
import Landing from "./components/landing/Landing";
import NotFound from "./components/notFound/NotFound";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/kpis"
          element={
            <ProtectedRoute>
              <Kpis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proyecto/:proyecto_id"
          element={
            <ProtectedRoute>
              <Proyecto />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proyecto/:proyecto_id/tarea/:tarea_id"
          element={
            <ProtectedRoute>
              <TareaHija />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proyecto_miembro/:proyecto_id"
          element={
            <ProtectedRoute>
              <ProyectoMember />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proyecto_miembro/:proyecto_id/tarea/:tarea_id"
          element={
            <ProtectedRoute>
              <ProyectoMemberHijo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proyecto-kpi/:proyectoId"
          element={
            <ProtectedRoute>
              <KpisProyect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proyecto/:proyectoId/calendar"
          element={
            <ProtectedRoute>
              <TaskCalendar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}