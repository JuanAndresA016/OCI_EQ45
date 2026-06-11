import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { OrbitProgress } from "react-loading-indicators";
import Aside from "../../layouts/aside/Aside";
import { useParams } from "react-router-dom";
import { API_URL } from "../../services/api";
import "./KpisProyect.css";

export default function KpisProyect() {
    const [horasRaw, setHorasRaw] = useState([]);
    const [tareasRaw, setTareasRaw] = useState([]);
    const [horas, setHoras] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [labels, setLabels] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [selectedDeveloper, setSelectedDeveloper] = useState("TODOS");
    const [loading, setLoading] = useState(true);

    const { proyectoId } = useParams();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [hRes, tRes] = await Promise.all([
                    fetch(`${API_URL}/api/tareas/horas-sprint?proyectoId=${proyectoId}`),
                    fetch(`${API_URL}/api/tareas/tareas-completadas?proyectoId=${proyectoId}`)
                ]);

                const horasData = await hRes.json();
                const tareasData = await tRes.json();

                setHorasRaw(Array.isArray(horasData) ? horasData : []);
                setTareasRaw(Array.isArray(tareasData) ? tareasData : []);

                const devMap = new Map();

                horasData.forEach(item => {
                    devMap.set(item.personaId, {
                        personaId: item.personaId,
                        nombre: item.nombre
                    });
                });

                tareasData.forEach(item => {
                    devMap.set(item.personaId, {
                        personaId: item.personaId,
                        nombre: item.nombre
                    });
                });

                setDevelopers([...devMap.values()]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [proyectoId]);

    useEffect(() => {
        construirGraficas();
    }, [horasRaw, tareasRaw, selectedDeveloper]);

    const construirGraficas = () => {
        const horasFiltradas =
            selectedDeveloper === "TODOS"
                ? horasRaw
                : horasRaw.filter(item => String(item.personaId) === String(selectedDeveloper));

        const tareasFiltradas =
            selectedDeveloper === "TODOS"
                ? tareasRaw
                : tareasRaw.filter(item => String(item.personaId) === String(selectedDeveloper));

        const sprintsArr = [
            ...new Set([
                ...horasFiltradas.map(i => i.sprintTitulo),
                ...tareasFiltradas.map(i => i.sprintTitulo)
            ])
        ];

        setLabels(sprintsArr);

        const usuarios = [
            ...new Set([
                ...horasFiltradas.map(i => i.nombre),
                ...tareasFiltradas.map(i => i.nombre)
            ])
        ];

        const horasSeriesData = usuarios.map(user => ({
            label: user,
            data: sprintsArr.map(sprint => {
                const item = horasFiltradas.find(
                    i => i.sprintTitulo === sprint && i.nombre === user
                );
                return item ? item.horas : 0;
            })
        }));

        const tareasSeriesData = usuarios.map(user => ({
            label: user,
            data: sprintsArr.map(sprint => {
                const item = tareasFiltradas.find(
                    i => i.sprintTitulo === sprint && i.nombre === user
                );
                return item ? item.tareasCompletadas : 0;
            })
        }));

        setHoras(horasSeriesData);
        setTareas(tareasSeriesData);
    };

    return (
        <div className="main_content">
            <Aside />

            <div className="dashboard">
                <div className="dashboard_container">
                    <div className="dashboard_container_content">
                        <h1>KPIs del proyecto</h1>

                        {loading ? (
                            <OrbitProgress color="#4040FB" size="medium" />
                        ) : (
                            <>
                                <div className="kpi_filter">
                                    <label>Ver por developer:</label>

                                    <select
                                        value={selectedDeveloper}
                                        onChange={(e) => setSelectedDeveloper(e.target.value)}
                                    >
                                        <option value="TODOS">Todos</option>

                                        {developers.map(dev => (
                                            <option key={dev.personaId} value={dev.personaId}>
                                                {dev.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}