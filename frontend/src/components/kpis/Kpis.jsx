import React from "react";
import Aside from "../../layouts/aside/Aside";
import "./Kpis.css";

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
                            <h1>Kpis de productividad</h1>
                            <span>Metricas de rendimiento del equipo y proyectos</span>
                        </div>

                        
                    </div>
                </div>
            </div>      
        
        </>
    )
}