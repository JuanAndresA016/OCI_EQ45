import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../services/api";
import Aside from "../../layouts/aside/Aside";
import Header from "../../layouts/header/Header";
import "./TaskCalendar.css";

export default function TaskCalendar() {
    const { proyectoId } = useParams();

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/auth/me`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error("Error obteniendo usuario");
        }

        return await res.json();
    };

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${API_URL}/api/tareas/proyecto/${proyectoId}/todas`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }

        const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        const init = async () => {
            try {
                const userData = await fetchUser();
                setUser(userData);

                await fetchTasks();
            } catch (err) {
                console.error("Error cargando calendario:", err);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [proyectoId]);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    const getTasksByDay = (day) => {
        if (!day) return [];

        const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        return tasks.filter(t => t.fechaFin === date);
    };

    const getTaskLink = (task) => {
        return `/proyecto/${proyectoId}/tarea/${task.id}`;
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isLate = (task) => {
        if (!task.fechaFin) return false;
        return new Date(task.fechaFin) < new Date() && task.estado !== "COMPLETADA";
    };

    const getTaskClass = (task) => {
        if (isLate(task)) return "VENCIDA";
        return task.estado;
    };

    return (
        <div className="main_content">
            <Aside />

            <div className="dashboard">
                {user && <Header proyectoId={proyectoId} />}

                <div className="dashboard_container_content">
                    <h1>Calendario de tareas</h1>

                    {loading ? (
                        <p>Cargando calendario...</p>
                    ) : (
                        <div className="task_calendar">
                            <div className="calendar_header">
                                <button onClick={prevMonth}>‹</button>

                                <h2>
                                    {currentDate.toLocaleString("es-MX", {
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </h2>

                                <button onClick={nextMonth}>›</button>
                            </div>

                            <div className="calendar_weekdays">
                                <span>Dom</span>
                                <span>Lun</span>
                                <span>Mar</span>
                                <span>Mié</span>
                                <span>Jue</span>
                                <span>Vie</span>
                                <span>Sáb</span>
                            </div>

                            <div className="calendar_grid">
                                {calendarDays.map((day, index) => {
                                    const dayTasks = getTasksByDay(day);

                                    return (
                                        <div
                                            key={index}
                                            className={`calendar_day ${!day ? "empty" : ""}`}
                                        >
                                            {day && (
                                                <>
                                                    <div className="calendar_day_number">
                                                        <strong>{day}</strong>

                                                        {dayTasks.length > 0 && (
                                                            <span>{dayTasks.length}</span>
                                                        )}
                                                    </div>

                                                    <div className="calendar_tasks">
                                                        {dayTasks.map(task => (
                                                            <a
                                                                key={task.id}
                                                                href={getTaskLink(task)}
                                                                className={`calendar_task ${getTaskClass(task)}`}
                                                                title={task.descripcion}
                                                            >
                                                                {task.titulo}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}