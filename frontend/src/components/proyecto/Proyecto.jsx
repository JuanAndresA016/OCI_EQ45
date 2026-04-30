import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Proyecto.css";
import Aside from "../../layouts/aside/Aside";
import { OrbitProgress } from "react-loading-indicators";

export default function Proyecto() {
    const { proyecto_id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const [showAddMember, setShowAddMember] = useState(false);
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [showAddRole, setShowAddRole] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [personaRoles, setPersonaRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [tareas, setTareas] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);


    const openEditTask = (task) => {
        setEditingTask(task);
    };

    const handleUpdateTask = async () => {

        if (
            !editingTask.titulo ||
            !editingTask.descripcion ||
            !editingTask.fechaInicio ||
            !editingTask.fechaFin
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://140.84.180.142:8080/api/tareas/${editingTask.id}`,
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
                `http://140.84.180.142:8080/api/tareas?proyectoId=${proyecto_id}&creadorId=${user.id}`
            );

            const data = await updated.json();
            setTasks(Array.isArray(data) ? data : []);

            setEditingTask(null);

        } catch (err) {
            console.error(err);
            alert("Error actualizando tarea");
        }
    };

    const handleDeleteTask = async (taskId) => {
        const confirmDelete = window.confirm("¿Eliminar esta tarea?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://140.84.180.142:8080/api/tareas/${taskId}`,
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

    const [taskForm, setTaskForm] = useState({
        titulo: "",
        descripcion: "",
        estado: "PENDIENTE",
        tipoMedicion: "HORAS",
        horasTrabajadas: "",
        fechaInicio: "",
        fechaFin: ""
    });

    const [tasks, setTasks] = useState([]);

    const total = tasks.length;

    const completadas = tasks.filter(t => t.estado === "COMPLETADA").length;

    const enProgreso = tasks.filter(t => t.estado === "EN_PROGRESO").length;

    const vencidas = tasks.filter(t => {
        if (!t.fechaFin) return false;
        return new Date(t.fechaFin) < new Date() && t.estado !== "COMPLETADA";
    }).length;

    const porHacer = tasks.filter(t => t.estado === "PENDIENTE");
    const doing = tasks.filter(t => t.estado === "EN_PROGRESO");
    const done = tasks.filter(t => t.estado === "COMPLETADA");
    const late = tasks.filter(t => {
        if (!t.fechaFin) return false;
        return new Date(t.fechaFin) < new Date() && t.estado !== "COMPLETADA";
    });

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

            const res = await fetch("http://140.84.180.142:8080/api/tareas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    ...taskForm,
                    proyectoId: proyecto_id
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            // 🔥 refrescar tareas
            const updated = await fetch(
                `http://140.84.180.142:8080/api/tareas?proyectoId=${proyecto_id}&creadorId=${user.id}`
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

    const fetchPersonaRoles = async () => {
        const res = await fetch(
            `http://140.84.180.142:8080/api/persona-rol/${proyecto_id}`
        );
        const data = await res.json();
        console.log(data)
        setPersonaRoles(Array.isArray(data) ? data : []);
    };

    const assignRole = async (personaId, rolId) => {
        if (!rolId) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://140.84.180.142:8080/api/persona-rol", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    personaId,
                    rolId
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            await fetchPersonaRoles();

        } catch (err) {
            console.error(err);
            alert("Error asignando rol");
        }
    };

    const removeRole = async (personaId, rolId) => {
        try {
            const token = localStorage.getItem("token");

            console.log("DELETE:", personaId, rolId); // 👈 DEBUG

            const res = await fetch(
                `http://140.84.180.142:8080/api/persona-rol?personaId=${personaId}&rolId=${rolId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            console.log("STATUS:", res.status);

            if (!res.ok) {
                const text = await res.text();
                console.error("ERROR BACKEND:", text);
            }

            await fetchPersonaRoles();

        } catch (err) {
            console.error(err);
        }
    };




    const fetchRoles = async (userId) => {
        const res = await fetch(
            `http://140.84.180.142:8080/api/roles/proyecto/${proyecto_id}`
        );

        const data = await res.json();
        setRoles(Array.isArray(data) ? data : []);
    };

    const handleAddRole = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!roleName.trim()) {
                alert("El nombre del rol es obligatorio");
                return;
            }

            const res = await fetch("http://140.84.180.142:8080/api/roles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    nombre: roleName,
                    proyectoId: proyecto_id
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            setRoleName("");
            setShowAddRole(false);

            fetchRoles();

        } catch (err) {
            console.error(err);
            alert("Error creando rol");
        }
    };

    const handleDeleteRole = async (rolId) => {
        if (!window.confirm("¿Eliminar rol?")) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://140.84.180.142:8080/api/roles/${rolId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            if (!res.ok) throw new Error();

            setRoles(prev => prev.filter(r => r.id !== rolId));

        } catch (err) {
            console.error(err);
        }
    };


    const handleAddMember = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                "http://140.84.180.142:8080/api/personas-proyectos",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({
                        email,
                        proyectoId: proyecto_id,
                        creadorId: user.id
                    })
                }
            );

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            setEmail("");
            setShowAddMember(false);

            // refrescar lista
            const updated = await fetch(
                `http://140.84.180.142:8080/api/personas-proyectos/${proyecto_id}/${user.id}`
            );

            const data = await updated.json();
            setMembers(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error(err);
            alert("No se pudo agregar el miembro");
        }
    };

    const handleDeleteMember = async (memberId) => {
        const confirmDelete = window.confirm(
            "¿Seguro que deseas eliminar a este usuario del proyecto?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://140.84.180.142:8080/api/personas-proyectos?personaId=${memberId}&proyectoId=${proyecto_id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            if (!res.ok) {
                const text = await res.text(); // 👈 clave para ver el error real
                console.error("Backend error:", text);
                throw new Error("Error al eliminar miembro");
            }

            setMembers(prev => prev.filter(m => m.id !== memberId));

        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        const init = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const userRes = await fetch("http://140.84.180.142:8080/auth/me", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                if (!userRes.ok) throw new Error("Error obteniendo usuario");

                const userData = await userRes.json();
                setUser(userData);

                const resMembers = await fetch(
                    `http://140.84.180.142:8080/api/personas-proyectos/${proyecto_id}/${userData.id}`
                );
                const membersData = await resMembers.json();

                setMembers(Array.isArray(membersData) ? membersData : []);

                // 🔹 ROLES
                const resRoles = await fetch(
                    `http://140.84.180.142:8080/api/roles/proyecto/${proyecto_id}`
                );
                const rolesData = await resRoles.json();
                setRoles(Array.isArray(rolesData) ? rolesData : []);

                // 🔹 PERSONA-ROL
                const resPersonaRoles = await fetch(
                    `http://140.84.180.142:8080/api/persona-rol/${proyecto_id}`
                );
                const personaRolesData = await resPersonaRoles.json();
                setPersonaRoles(Array.isArray(personaRolesData) ? personaRolesData : []);

                const resTasks = await fetch(
                    `http://140.84.180.142:8080/api/tareas?proyectoId=${proyecto_id}&creadorId=${userData.id}`
                );

                const tasksData = await resTasks.json();
                setTasks(Array.isArray(tasksData) ? tasksData : []);

            } catch (err) {
                console.error(err);
                setMembers([]);
            } finally {
                setLoading(false);
            }

            console.log("personaRoles:", personaRoles);


        };

        init();
    }, [proyecto_id]);



    return (
        <div className="main_content">
            <Aside />

            <div className="dashboard">
                <div className="dashboard_container">
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
                        <h1>Mi portal</h1>
                        <div>
                            <button
                                className="btn_create_task"
                                onClick={() => setShowTaskForm(true)}
                            >
                                + Crear tarea
                            </button>
                            {editingTask && (
                                <div className="modal">

                                    <div className="modal_content">

                                        <h3>Editar tarea</h3>

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
                                            type="date"
                                            value={editingTask.fechaInicio}
                                            onChange={(e) =>
                                                setEditingTask({ ...editingTask, fechaInicio: e.target.value })
                                            }
                                        />

                                        <input
                                            type="date"
                                            value={editingTask.fechaFin}
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

                                    {/* 🔥 TU DATEPICKER */}
                                    <input
                                        type="date"
                                        value={taskForm.fechaInicio}
                                        onChange={(e) => setTaskForm({ ...taskForm, fechaInicio: e.target.value })}
                                    />

                                    <input
                                        type="date"
                                        value={taskForm.fechaFin}
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
                        </div>


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


                        <div className="kanban">

                            {/* POR HACER */}
                            <div className="column">
                                <h3>Por hacer</h3>

                                {porHacer.map(task => (
                                    <div className="task_card" key={task.id}>
                                        <div className="actions_card">
                                            <a href={`/proyecto/${proyecto_id}/tarea/${task.id}`} className="task_title">{task.titulo}</a>

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

                                        </div>

                                        <div className="task_info">
                                            <span>{task.descripcion}</span>
                                            <span> <i className="fas fa-calendar"></i> {task.fechaInicio} </span>
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
                                            <a href={`/proyecto/${proyecto_id}/tarea/${task.id}`} className="task_title">{task.titulo}</a>

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
                                            <span className="priority media">en progreso</span>

                                        </div>

                                        <div className="task_info">
                                            <span>{task.descripcion}</span>
                                            <span> <i className="fas fa-calendar"></i> {task.fechaInicio} </span>
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
                                            <a href={`/proyecto/${proyecto_id}/tarea/${task.id}`} className="task_title">{task.titulo}</a>

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
                                            <span> <i className="fas fa-calendar"></i> {task.fechaInicio} </span>
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
                                            <a href={`/proyecto/${proyecto_id}/tarea/${task.id}`} className="task_title">{task.titulo}</a>

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



                                        </div><div>
                                            <span className="priority alta">Vencida</span>

                                        </div>

                                        <div className="task_info">
                                            <span>{task.descripcion}</span>
                                            <span> <i className="fas fa-calendar"></i> {task.fechaInicio} </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="dashboard_container_content_personas">
                            <span>Personas miembros del equipo:</span>
                            <div className="miembros">
                                <button onClick={() => setShowAddMember(true)}>
                                    <i className="fa-solid fa-plus"></i> Agregar miembro
                                </button>
                            </div>

                            {showAddMember && (
                                <div className="add_member_form">
                                    <input
                                        type="email"
                                        placeholder="Correo del miembro"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input_mail"
                                    />

                                    <button onClick={handleAddMember} className="agregar">
                                        Agregar
                                    </button>

                                    <button onClick={() => setShowAddMember(false)} className="cancelar">
                                        Cancelar
                                    </button>
                                </div>
                            )}

                            {loading ? (
                                <OrbitProgress color="#4040FB" size="medium" />
                            ) : members.length === 0 ? (
                                <span>No hay miembros activos...</span>
                            ) : (
                                members.map(member => (
                                    <div className="members" key={member.id}>
                                        <div className="members_container">

                                            <p><i className="fa-regular fa-user"></i>{member.nombre}</p>
                                            <p><i className="fa-solid fa-at"></i>{member.email}</p>

                                            <i
                                                className="fas fa-trash trash_members"
                                                onClick={() => handleDeleteMember(member.id)}
                                            ></i>


                                        </div>

                                        <div className="roles_asignacion">

                                            <select
                                                onChange={(e) => {
                                                    const rolId = e.target.value;
                                                    if (rolId) assignRole(member.id, rolId);
                                                }}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Asignar rol</option>

                                                {roles.map(role => (
                                                    <option key={role.id} value={role.id}>
                                                        {role.nombre}
                                                    </option>
                                                ))}
                                            </select>

                                            <div className="roles_usuario">

                                                {personaRoles
                                                    .filter(pr => pr.personaId === member.id)
                                                    .map(pr => (
                                                        <div key={pr.rolId} className="rol_item">

                                                            <span>{pr.rolNombre}</span>

                                                            <i
                                                                className="fa-solid fa-trash"
                                                                onClick={() => removeRole(member.id, pr.rolId)}
                                                                style={{ cursor: "pointer", marginLeft: "8px" }}
                                                            ></i>

                                                        </div>
                                                    ))
                                                }

                                            </div>

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>



                        <div className="dashboard_container_content_roles">
                            <span>Roles del proyecto:</span>

                            <div className="dashboard_container_content_roles_container">

                                <div className="add_role">
                                    <button onClick={() => setShowAddRole(true)}>
                                        <i className="fa-solid fa-plus"></i> Añadir roles
                                    </button>
                                </div>

                                {showAddRole && (
                                    <div className="add_member_form">
                                        <input
                                            type="text"
                                            placeholder="Nombre del rol"
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)}
                                        />

                                        <button onClick={handleAddRole} className="agregar">
                                            Guardar
                                        </button>

                                        <button onClick={() => setShowAddRole(false)} className="cancelar">
                                            Cancelar
                                        </button>
                                    </div>
                                )}

                                {loading ? (
                                    <OrbitProgress color="#4040FB" size="medium" />
                                ) : roles.length === 0 ? (
                                    <span>No hay roles creados</span>
                                ) : (
                                    roles.map(role => (
                                        <div className="members" key={role.id}>
                                            <div className="members_container">
                                                <p>{role.nombre}</p>

                                                <i
                                                    className="fas fa-trash trash_members"
                                                    onClick={() => handleDeleteRole(role.id)}
                                                ></i>
                                            </div>
                                        </div>
                                    ))
                                )}

                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}