// import React from "react";
// import Aside from "../../layouts/aside/Aside";
import "./Kpis.css";
// import Progress from "../../layouts/kpis/progress/Progress";
// import Tasks from "../../layouts/kpis/tasks/Tasks";
// import TaskUser from "../../layouts/kpis/taskUser/TaskUser";
// import Line from "../../layouts/kpis/line/Line";
// import Percentage from "../../layouts/kpis/percentage/Percentage";

// export default function Kpis(){


//     return(
//         <>
//             <div className="main_content">
//                 <Aside />    

//                 <div className="dashboard">
//                     <div className="dashboard_container">
//                         <header className="dashboard_container_header">
//                             <div className="input_header_container">
//                                 <i class="fa-solid fa-magnifying-glass"></i>
//                                 <input type="text" placeholder="Buscar proyectos, tareas, miembros" />
//                             </div>

//                             <div className="dashboard_container_announcements">
//                                 <i class="fa-regular fa-bell"></i>

//                             </div>
//                         </header>

//                         <div className="dashboard_container_content">
//                             <div className="dashboard_container_content_title">
//                                     <h1>KPIs de productividad</h1>
//                             <span>Metricas de rendimiento del equipo y proyectos</span>

//                             </div>
                            
//                             <Progress />

//                             <div className="dashboard_container_content_metrics">


//                                 <div className="dashboard_container_content_metrcis1">
//                                     <Tasks />

//                                 </div>


//                                 <div className="dashboard_container_content_metrcis2">
//                                                                         <TaskUser />

//                                 </div>

//                                 <div className="dashboard_container_content_metrics3">
//                                     <span> % Avance del proyecto en el tiempo</span>
//                                     <Line />
//                                 </div>


//                                 <div className="dashboard_container_content_metrics4">
//                                     <span> Tasa de entregas tarea a tiempo</span>
//                                     <Percentage />
//                                 </div>



//                             </div>
//                         </div>


                        

                        
//                     </div>
//                 </div>
//             </div>      
        
//         </>
//     )
// }


import React, { useEffect, useState } from "react";
import Aside from "../../layouts/aside/Aside";
import { OrbitProgress } from "react-loading-indicators";
import BasicDatePicker from "../../layouts/datepicker/BasicDatePicker";
import dayjs from "dayjs";

export default function Kpis() {

    const [dataObj, setDataObj] = useState([]);
    const [dataObj2, setDataObj2] = useState([])
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleEdit = (item) => {
        setEditMode(true);
        setEditId(item.id);

        setNombre(item.nombre);
        setDescripcion(item.descripcion);

        // convertir a dayjs
        setFechaInicio(item.fechaInicio ? dayjs(item.fechaInicio) : null);
        setFechaFin(item.fechaFin ? dayjs(item.fechaFin) : null);

        setShowForm(true);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            const payload = {
                nombre,
                descripcion,
                fechaInicio: fechaInicio ? fechaInicio.format("YYYY-MM-DD") : null,
                fechaFin: fechaFin ? fechaFin.format("YYYY-MM-DD") : null,
                creadorId: user.id
            };

            const response = await fetch(`http://localhost:8080/api/proyectos/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar");
            }

             const nuevo = await fetch(
                `http://localhost:8080/api/proyectos/creador/${user.id}`
            );

            const nuevoProyecto = await nuevo.json();

            console.log("Proyecto creado:", nuevoProyecto);

            setDataObj(nuevoProyecto);

            

            setEditMode(false);
            setEditId(null);
            setShowForm(false);

            setNombre("");
            setDescripcion("");
            setFechaInicio(null);
            setFechaFin(null);

        } catch (error) {
            console.error(error);
            alert("No se pudo actualizar");
        }
    };


    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            if (!window.confirm("¿Seguro que quieres eliminar este proyecto?")) return;

            const response = await fetch(`http://localhost:8080/api/proyectos/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar");
            }

            // 🔥 actualizar lista sin recargar
            setDataObj(prev => prev.filter(p => p.id !== id));

        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar el proyecto");
        }
    };
    const handleCreate = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!nombre.trim()) {
                alert("El nombre es obligatorio");
                return;
            }

            if (fechaInicio && fechaFin && fechaFin.isBefore(fechaInicio)) {
                alert("La fecha fin no puede ser menor a la de inicio");
                return;
            }

            const payload = {
                nombre: nombre,
                descripcion: descripcion,
                fechaInicio: fechaInicio ? fechaInicio.format("YYYY-MM-DD") : null,
                fechaFin: fechaFin ? fechaFin.format("YYYY-MM-DD") : null,
                creadorId: user.id
            };

            console.log("Enviando:", payload);

            const response = await fetch("http://localhost:8080/api/proyectos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error backend:", errorText);
                throw new Error("Error al crear proyecto");
            }

            const nuevo = await fetch(
                `http://localhost:8080/api/proyectos/creador/${user.id}`
            );

            const nuevoProyecto = await nuevo.json();

            console.log("Proyecto creado:", nuevoProyecto);

            setDataObj(nuevoProyecto);

            setNombre("");
            setDescripcion("");
            setFechaInicio(null);
            setFechaFin(null);
            setShowForm(false);

        } catch (error) {
            console.error(error);
            alert("No se pudo crear el proyecto");
        }
    };

    const getEstado = (inicio, fin) => {
        if (!inicio || !fin) return "Sin fecha";

        const hoy = new Date();
        const fechaInicio = new Date(inicio);
        const fechaFin = new Date(fin);

        if (hoy < fechaInicio) return "Pendiente";
        if (hoy >= fechaInicio && hoy <= fechaFin) return "En progreso";
        return "Concluido";
    };

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString();
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

                const projRes = await fetch(
                    `http://localhost:8080/api/proyectos/creador/${userData.id}`
                );


                const data = await projRes.json();
                console.log(data)

                setDataObj(Array.isArray(data) ? data : []);



                const projRes2 = await fetch(
                    `http://localhost:8080/api/proyectos/miembro/${userData.id}`
                );


                const data2 = await projRes2.json();

                setDataObj2(Array.isArray(data2) ? data2 : []);
            } catch (err) {
                console.error(err);
                setDataObj([]);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const proyectos = dataObj || [];
    const proyectos2 = dataObj2 || [];

    let total = proyectos.length;
    let activos = 0;
    let finalizados = 0;
    let pendientes = 0;

    proyectos.forEach(p => {
        const estado = getEstado(p.fechaInicio, p.fechaFin);

        if (estado === "En progreso") activos++;
        else if (estado === "Concluido") finalizados++;
        else if (estado === "Pendiente") pendientes++;
    });

    return (
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
                    <h1>KPIs por proyecto</h1>

                    <div className="dasboard_container_content_projects">
                        <h2>Mis proyectos</h2>
                        


                        <div className="content_projects_myprojects">
                            {loading ? (
                                <OrbitProgress color="#4040FB" size="medium" />
                            ) : proyectos.length === 0 ? (
                                <span>No tienes proyectos activos</span>
                            ) : (
                                proyectos.map((item) => (
                                    <div className="content_projects_myproyects_element" key={item.id}>

                                        <a href={`/proyecto-kpi/${item.id}`}>
                                            Portal proyecto {item.nombre} <i className="fa-solid fa-angle-right"></i>
                                        </a>

                                       

                                       

                                        <div className="members">
                                            <span>
                                                <i className="fa-regular fa-user"></i> {item.miembros } miembros
                                            </span>
                                        </div>

                                       
                                    </div>
                                ))
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}