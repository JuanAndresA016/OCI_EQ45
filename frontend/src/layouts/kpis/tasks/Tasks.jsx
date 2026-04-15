import React from "react";
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import "./Tasks.css"

const completadas = [20];
const proceso = [10];
const vencidas = [2];
const pendiente = [1];
const xLabels = [
    'Tareas',
];

export default function Tasks() {
    return (
        <>
        <div className="task_container">
            <span>Resumen de Estado</span>
            <Box sx={{ width: '80%', height: 300 }}>
                <BarChart
                    series={[
                        { data: completadas, label: 'completadas', id: 'pvId' },
                        { data: proceso, label: 'En proceso', id: 'uvId' },
                                                { data: vencidas, label: 'vencidas' },

                        {data: pendiente, label: "pendiente"},
                    ]}
                    xAxis={[{ data: xLabels, height: 28 }]}
                    yAxis={[{ width: 50 }]}
                />
            </Box>
        </div>
            
        </>

    );
}