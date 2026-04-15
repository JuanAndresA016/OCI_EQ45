import React from "react";
import Aside from "../../layouts/aside/Aside";
import "./Kpis.css";
import Progress from "../../layouts/kpis/progress/Progress";
import Tasks from "../../layouts/kpis/tasks/Tasks";
import TaskUser from "../../layouts/kpis/taskUser/TaskUser";
import Line from "../../layouts/kpis/line/Line";
import Percentage from "../../layouts/kpis/percentage/Percentage";

export default function Kpis(){


    return(
        <>
            <div className="main_content">
                <Aside />    

                <div className="dashboard">
                    <div className="dashboard_container">
                        <header className="dashboard_container_header">
                            <div className="input_header_container">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="text" placeholder="Buscar proyectos, tareas, miembros" />
                            </div>

                            <div className="dashboard_container_announcements">
                                <i class="fa-regular fa-bell"></i>

                            </div>
                        </header>

                        <div className="dashboard_container_content">
                            <div className="dashboard_container_content_title">
                                    <h1>KPIs de productividad</h1>
                            <span>Metricas de rendimiento del equipo y proyectos</span>

                            </div>
                            
                            <Progress />

                            <div className="dashboard_container_content_metrics">


                                <div className="dashboard_container_content_metrcis1">
                                    <Tasks />

                                </div>


                                <div className="dashboard_container_content_metrcis2">
                                                                        <TaskUser />

                                </div>

                                <div className="dashboard_container_content_metrics3">
                                    <span> % Avance del proyecto en el tiempo</span>
                                    <Line />
                                </div>


                                <div className="dashboard_container_content_metrics4">
                                    <span> Tasa de entregas tarea a tiempo</span>
                                    <Percentage />
                                </div>



                            </div>
                        </div>


                        

                        
                    </div>
                </div>
            </div>      
        
        </>
    )
}