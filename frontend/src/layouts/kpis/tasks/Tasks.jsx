import React from "react";
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import "./Tasks.css"
import { OrbitProgress } from "react-loading-indicators";

const completadas = [20];
const proceso = [10];
const vencidas = [2];
const pendiente = [1];

const xLabels = ['Tareas'];

export default function Tasks() {

    const isloading = false; // hardcodeado

    return (
        <div className="task_container">
            <span>Resumen de Estado</span>

            {isloading ? (
                <OrbitProgress color="#4040FB" size="medium" />
            ) : (
                <Box sx={{ width: '80%', height: 300 }}>
                    <BarChart
                        series={[
                            { data: completadas, label: "Completadas", id: "c" },
                            { data: proceso, label: "En proceso", id: "p" },
                            { data: vencidas, label: "Vencidas", id: "v" },
                            { data: pendiente, label: "Pendiente", id: "pe" },
                        ]}
                        xAxis={[{ data: xLabels, scaleType: 'band' }]}
                        yAxis={[{ width: 50 }]}
                    />
                </Box>
            )}
        </div>
    );
}