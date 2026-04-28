import Aside from "../../layouts/aside/Aside";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProyectoMemberHijo() {
    const { proyecto_id, tarea_id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [roles, setRoles] = useState([]);
    const [tareaInfo, setTareaInfo] = useState([]);
    const [rolesAsignados, setRolesAsignados] = useState([]);

    const [taskForm, setTaskForm] = useState({
        titulo: "",
        descripcion: "",
        estado: "PENDIENTE"
    });

    const [editingTask, setEditingTask] = useState(null);
    const porHacer = tasks.filter(t => t.estado === "PENDIENTE");
    const doing = tasks.filter(t => t.estado === "EN_PROGRESO");
    const done = tasks.filter(t => t.estado === "COMPLETADA");

    const fetchRoles = async (userId) => {
        const res = await fetch(
            `http://localhost:8080/api/roles/proyecto/${proyecto_id}`
        );

        const data = await res.json();
        setRoles(Array.isArray(data) ? data : []);
    };

    const fetchRolesByTask = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:8080/api/tarea-rol/${tarea_id}`,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const data = await res.json();
            setRolesAsignados(data);

        } catch (err) {
            console.error(err);
        }
    };

    const handleAssignRol = async (rolId) => {
        if (!rolId) return;

        try {
            const token = localStorage.getItem("token");

            await fetch("http://localhost:8080/api/tarea-rol", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    tareaId: Number(tarea_id),
                    rolId: Number(rolId)
                })
            });

            fetchRolesByTask();

        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveRol = async (rolId) => {
        try {
            const token = localStorage.getItem("token");

            await fetch(
                `http://localhost:8080/api/tarea-rol?tareaId=${tarea_id}&rolId=${rolId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            fetchRolesByTask();

        } catch (err) {
            console.error(err);
        }
    };

    // opcional si manejas vencidas
    const late = tasks.filter(t => {
        return t.fechaFin && new Date(t.fechaFin) < new Date() && t.estado !== "COMPLETADA";
    });

    const openEditTask = (task) => {
        setEditingTask(task);
    };

    const handleDeleteTask = async (taskId) => {
        const confirmDelete = window.confirm("¿Eliminar esta tarea?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:8080/api/tareas/${taskId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            if (!res.ok) throw new Error();

            // refrescar lista
            setTasks(prev => prev.filter(t => t.id !== taskId));

        } catch (err) {
            console.error(err);
            alert("Error eliminando tarea");
        }
    };



    const handleCreateTask = async () => {

        // 🔴 VALIDACIÓN
        if (
            !taskForm.titulo ||
            !taskForm.descripcion ||
            !taskForm.fechaInicio ||
            !taskForm.fechaFin ||
            !taskForm.horasTrabajadas
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:8080/api/tareas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    ...taskForm,
                    proyectoId: proyecto_id,
                    padreId: tarea_id
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            // 🔥 refrescar tareas
            const updated = await fetch(
                `http://localhost:8080/api/tareas/filtradas?proyectoId=${proyecto_id}&personaId=${user.id}&padreId=${tarea_id}`
            );

            const data = await updated.json();
            setTasks(Array.isArray(data) ? data : []);

            // reset
            setShowTaskForm(false);
            setTaskForm({
                titulo: "",
                descripcion: "",
                estado: "PENDIENTE",
                tipoMedicion: "HORAS",
                horasTrabajadas: "",
                fechaInicio: "",
                fechaFin: ""
            });

        } catch (err) {
            console.error(err);
            alert("Error creando tarea");
        }
    };


    const handleUpdateTask = async () => {

        if (
    !editingTask.titulo ||
    !editingTask.descripcion ||
    !editingTask.fechaInicio ||
    !editingTask.fechaFin ||
    !editingTask.horasTrabajadas
) {
    alert("Todos los campos son obligatorios");
    return;
}
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:8080/api/tareas/${editingTask.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(editingTask)
                }
            );

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            // refrescar
            const updated = await fetch(
                `http://localhost:8080/api/tareas/filtradas?proyectoId=${proyecto_id}&personaId=${userData.id}&padreId=${tarea_id}`
            );

            const data = await updated.json();
            setTasks(Array.isArray(data) ? data : []);

            setEditingTask(null);

        } catch (err) {
            console.error(err);
            alert("Error actualizando tarea");
        }
    };

    const fetchTasks = async (userId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:8080/api/tareas/proyectos/${proyecto_id}/tareas?creadorId=${user.id}&padreId=${tarea_id}`,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            if (!res.ok) throw new Error("Error obteniendo tareas");

            const data = await res.json();
            setTasks(data);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                // Usuario
                const userRes = await fetch("http://localhost:8080/auth/me", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                if (!userRes.ok) throw new Error("Error obteniendo usuario");

                const userData = await userRes.json();
                setUser(userData);

                try {
                    const token = localStorage.getItem("token");

                    const res = await fetch(
                        `http://localhost:8080/api/tareas/filtradas?proyectoId=${proyecto_id}&personaId=${userData.id}&padreId=${tarea_id}`,
                        {
                            headers: {
                                "Authorization": "Bearer " + token
                            }
                        }
                    );

                    if (!res.ok) throw new Error("Error obteniendo tareas");

                    const data = await res.json();
                    setTasks(data);

                    await fetchRoles(userData.id);
                    await fetchRolesByTask();

                    const fetchTareaInfo = await fetch(`http://localhost:8080/api/tareas/${tarea_id}`)
                    const resTareaInfo = await fetchTareaInfo.json()
                    setTareaInfo(resTareaInfo);


                } catch (err) {
                    console.error(err);
                }


            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const total = tasks.length;
    const completadas = done.length;
    const enProgreso = doing.length;
    const vencidas = late.length;



    return (<>
        <div className="main_content">
            <Aside />

            <div className="dashboard">
                <header className="dashboard_container_header">
                    <div className="input_header_container">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Buscar proyectos, tareas, miembros" />
                    </div>

                    <div className="dashboard_container_announcements">
                        <i className="fa-regular fa-bell"></i>
                    </div>
                </header>

                <div className="dashboard_container_content">
                    <div className="dashboard_container_content">

                        <h1>Tarea {tareaInfo.titulo}</h1>
                        <span>{tareaInfo.descripcion}</span>
                        <div className="fechas">
                            <span><i className="fas fa-calendar"></i>{tareaInfo.fechaInicio}</span>
                            <span><i className="fas fa-calendar"></i>{tareaInfo.fechaFin}</span>
                        </div>
                        <span>Horas Trabajadas: {tareaInfo.horasTrabajadas}</span>
                        <span>Estado: <b>{tareaInfo.estado}</b></span>


                        <div className="roles_section">

                            <h3>Roles de la tarea</h3>

                            {rolesAsignados.length == 0 ? <span className="role_tag">Rol del padre</span> : rolesAsignados.map(r => {
                                const rol = roles.find(ro => ro.id === r.rolId);

                                return (
                                    <span key={r.rolId} className="role_tag">
                                        {rol ? rol.nombre : "Rol"}

                                        
                                    </span>
                                );
                            })}


                        </div>
                        <h2>Subtareas</h2>


                        <div className="dashboard_cards">

                            <div className="card">
                                <h2>{total}</h2>
                                <span>Total de Tareas</span>
                            </div>

                            <div className="card green">
                                <h2>{completadas}</h2>
                                <span>Completadas</span>
                            </div>

                            <div className="card yellow">
                                <h2>{enProgreso}</h2>
                                <span>En progreso</span>
                            </div>

                            <div className="card red">
                                <h2>{vencidas}</h2>
                                <span>Vencidas</span>
                            </div>

                        </div>

                        <div>

                        </div>

<div>
                            <button className="btn_create_task" onClick={() => setShowTaskForm(true)} > + Crear tarea </button>

</div>

                        {editingTask && (
                            <div className="modal">
                                <div className="modal_content">

                                    <h3>Editar subtarea</h3>

                                    <input
                                        value={editingTask.titulo}
                                        onChange={(e) =>
                                            setEditingTask({ ...editingTask, titulo: e.target.value })
                                        }
                                    />

                                    <textarea
                                        value={editingTask.descripcion}
                                        onChange={(e) =>
                                            setEditingTask({ ...editingTask, descripcion: e.target.value })
                                        }
                                    />

                                    <select
                                        value={editingTask.estado}
                                        onChange={(e) =>
                                            setEditingTask({ ...editingTask, estado: e.target.value })
                                        }
                                    >
                                        <option value="PENDIENTE">Por hacer</option>
                                        <option value="EN_PROGRESO">En progreso</option>
                                        <option value="COMPLETADA">Completada</option>
                                    </select>

                                    <input
    type="number"
    placeholder="Horas trabajadas"
    value={editingTask.horasTrabajadas || ""}
    onChange={(e) =>
        setEditingTask({
            ...editingTask,
            horasTrabajadas: e.target.value
        })
    }
/>

                                    <input
                                        type="date"
                                        value={editingTask.fechaInicio || ""}
                                        onChange={(e) =>
                                            setEditingTask({ ...editingTask, fechaInicio: e.target.value })
                                        }
                                    />

                                    <input
                                        type="date"
                                        value={editingTask.fechaFin || ""}
                                        onChange={(e) =>
                                            setEditingTask({ ...editingTask, fechaFin: e.target.value })
                                        }
                                    />

                                    <div className="modal_buttons">
                                        <button onClick={handleUpdateTask} className="agregar">
                                            Guardar
                                        </button>

                                        <button onClick={() => setEditingTask(null)} className="cancelar">
                                            Cancelar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* 🔥 FORM CREAR */}
                        {showTaskForm && (
                            <div className="task_form">

                                <input
                                    type="text"
                                    placeholder="Título"
                                    value={taskForm.titulo}
                                    onChange={(e) => setTaskForm({ ...taskForm, titulo: e.target.value })}
                                />

                                <textarea
                                    placeholder="Descripción"
                                    value={taskForm.descripcion}
                                    onChange={(e) => setTaskForm({ ...taskForm, descripcion: e.target.value })}
                                />

                                <select
                                    value={taskForm.estado}
                                    onChange={(e) => setTaskForm({ ...taskForm, estado: e.target.value })}
                                >
                                    <option value="PENDIENTE">Por hacer</option>
                                    <option value="EN_PROGRESO">En progreso</option>
                                    <option value="COMPLETADA">Completada</option>
                                </select>

                                <input
                                    type="number"
                                    placeholder="Horas trabajadas"
                                    value={taskForm.horasTrabajadas}
                                    onChange={(e) => setTaskForm({ ...taskForm, horasTrabajadas: e.target.value })}
                                />

                                <input
                                    type="date"
                                    value={taskForm.fechaInicio || ""}
                                    onChange={(e) => setTaskForm({ ...taskForm, fechaInicio: e.target.value })}
                                />

                                <input
                                    type="date"
                                    value={taskForm.fechaFin || ""}
                                    onChange={(e) => setTaskForm({ ...taskForm, fechaFin: e.target.value })}
                                />

                                <div className="task_form_buttons">
                                    <button onClick={handleCreateTask} className="agregar">
                                        Guardar
                                    </button>

                                    <button onClick={() => setShowTaskForm(false)} className="cancelar">
                                        Cancelar
                                    </button>
                                </div>

                            </div>
                        )}

                        {/* 🔥 KANBAN */}
                        <div className="kanban">

                            {/* POR HACER */}
                            <div className="column">
                                <h3>Por hacer</h3>

                                {porHacer.map(task => (
                                    <div className="task_card" key={task.id}>
                                        <div className="actions_card">
                                            <a href={`/proyecto_miembro/${proyecto_id}/tarea/${task.id}`} className="task_title">
                                                {task.titulo}
                                            </a>

                                            <div>
                                                <i
                                                    className="fa-solid fa-trash task_delete"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                ></i>

                                                <i
                                                    className="fa-solid fa-pen task_edit"
                                                    onClick={() => openEditTask(task)}
                                                ></i>
                                            </div>
                                        </div>

                                        <div className="task_info">
                                            <span>{task.descripcion}</span>
                                            <span>
                                                <i className="fas fa-calendar"></i> {task.fechaInicio}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* EN PROGRESO */}
                            <div className="column">
                                <h3>En progreso</h3>

                                {doing.map(task => (
                                    <div className="task_card" key={task.id}>
                                        <div className="actions_card">
                                            <a href={`/proyecto_miembro/${proyecto_id}/tarea/${task.id}`} className="task_title">
                                                {task.titulo}
                                            </a>

                                            <div>
                                                <i
                                                    className="fa-solid fa-trash task_delete"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                ></i>

                                                <i
                                                    className="fa-solid fa-pen task_edit"
                                                    onClick={() => openEditTask(task)}
                                                ></i>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="priority media">En progreso</span>
                                        </div>

                                        <div className="task_info">
                                            <span>{task.descripcion}</span>
                                            <span>
                                                <i className="fas fa-calendar"></i> {task.fechaInicio}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* COMPLETADAS */}
                            <div className="column">
                                <h3>Completadas</h3>

                                {done.map(task => (
                                    <div className="task_card" key={task.id}>
                                        <div className="actions_card">
                                            <a href={`/proyecto_miembro/${proyecto_id}/tarea/${task.id}`} className="task_title">
                                                {task.titulo}
                                            </a>

                                            <div>
                                                <i
                                                    className="fa-solid fa-trash task_delete"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                ></i>

                                                <i
                                                    className="fa-solid fa-pen task_edit"
                                                    onClick={() => openEditTask(task)}
                                                ></i>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="priority baja">Completa</span>
                                        </div>

                                        <div className="task_info">
                                            <span>{task.descripcion}</span>
                                            <span>
                                                <i className="fas fa-calendar"></i> {task.fechaInicio}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* VENCIDAS */}
                            <div className="column">
                                <h3>Vencidas</h3>

                                {late.map(task => (
                                    <div className="task_card" key={task.id}>
                                        <div className="actions_card">
                                            <a href={`/proyecto_miembro/${proyecto_id}/tarea/${task.id}`} className="task_title">
                                                {task.titulo}
                                            </a>

                                            <div>
                                                <i
                                                    className="fa-solid fa-trash task_delete"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                ></i>

                                                <i
                                                    className="fa-solid fa-pen task_edit"
                                                    onClick={() => openEditTask(task)}
                                                ></i>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="priority alta">Vencida</span>
                                        </div>

                                        <div className="task_info">
                                            <span>{task.descripcion}</span>
                                            <span>
                                                <i className="fas fa-calendar"></i> {task.fechaInicio}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>)
}