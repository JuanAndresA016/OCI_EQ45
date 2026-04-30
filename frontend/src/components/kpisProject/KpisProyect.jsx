import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import { OrbitProgress } from "react-loading-indicators";
import Aside from "../../layouts/aside/Aside";
import { useParams } from "react-router-dom";

export default function KpisProyect() {

    const [horas, setHoras] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);

const { proyectoId } = useParams();
    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:8080/api/tareas/horas-sprint?proyectoId=${proyectoId}`),
            fetch(`http://localhost:8080/api/tareas/tareas-completadas?proyectoId=${proyectoId}`)
        ])
            .then(async ([hRes, tRes]) => {
                const horasData = await hRes.json();
                const tareasData = await tRes.json();

                // ===== SPRINTS =====
                const sprintsArr = [...new Set(horasData.map(i => i.sprintTitulo))];
                setLabels(sprintsArr);

                // ===== USUARIOS =====
                const usuarios = [...new Set(horasData.map(i => i.nombre))];

                // ===== SERIES HORAS =====
                const horasSeriesData = usuarios.map(user => ({
                    label: user,
                    data: sprintsArr.map(sprint => {
                        const item = horasData.find(
                            i => i.sprintTitulo === sprint && i.nombre === user
                        );
                        return item ? item.horas : 0;
                    })
                }));

                // ===== SERIES TAREAS =====
                const tareasSeriesData = usuarios.map(user => ({
                    label: user,
                    data: sprintsArr.map(sprint => {
                        const item = tareasData.find(
                            i => i.sprintTitulo === sprint && i.nombre === user
                        );
                        return item ? item.tareasCompletadas : 0;
                    })
                }));

                setHoras(horasSeriesData);
                setTareas(tareasSeriesData);

                setLoading(false);
            });
    }, []);

    return (
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
                            <div>

                                <h2>Horas por Sprint</h2>
                                <Box sx={{ width: "100%", height: 350 }}>
                                    <BarChart
                                        series={horas}
                                        xAxis={[{ data: labels, scaleType: "band" }]}
                                    />
                                </Box>

                                <h2>Tareas completadas por Sprint</h2>
                                <Box sx={{ width: "100%", height: 350 }}>
                                    <BarChart
                                        series={tareas}
                                        xAxis={[{ data: labels, scaleType: "band" }]}
                                    />
                                </Box>

                            </div>
                        </div>





                    </div>
                </div>
            </div>

        </>
    )
}

