import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import "./Tasks.css"
import { OrbitProgress } from "react-loading-indicators";

// const completadas = [20];
// const proceso = [10];
// const vencidas = [2];
// const pendiente = [1];


const xLabels = [
    'Tareas',
];

export default function Tasks() {

    const [dataArray, setDataArray] = useState([]);
    const [isloading, SetIsLoading] = useState(true)





    async function fetchData(url) {
        fetch(url, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                setDataArray(data)
                SetIsLoading(false)
                
            });
    }

    useEffect(() => {
        fetchData("http://localhost:8080/api/detalle-tarea/resumen");
    }, [])

    useEffect(() => {


    }, [dataArray])


    return (
        <>
            <div className="task_container">
                <span>Resumen de Estado</span>
                {isloading ? <OrbitProgress color="#4040FB" size="medium" text="" textColor="" /> :
                <Box sx={{ width: '80%', height: 300 }}>
                    <BarChart
                        series={
                            dataArray.map((item) => ({
                                data: [item.cantidadTareas],
                                label: item.estadoTarea,
                                id: item.estadoTarea
                            }))
                        }
                        xAxis={[{ data: xLabels, height: 28 }]}
                        yAxis={[{ width: 50 }]}
                    />
                </Box>
}
            </div>

        </>

    );

    // return (
    //     <>
    //     <div className="task_container">
    //         <span>Resumen de Estado</span>
    //         <Box sx={{ width: '80%', height: 300 }}>
    //             <BarChart
    //                 series={[

    //                     { data: completadas, label: 'completadas', id: 'pvId' },
    //                     { data: proceso, label: 'En proceso', id: 'uvId' },
    //                                             { data: vencidas, label: 'vencidas' },

    //                     {data: pendiente, label: "pendiente"},
    //                 ]}
    //                 xAxis={[{ data: xLabels, height: 28 }]}
    //                 yAxis={[{ width: 50 }]}
    //             />
    //         </Box>
    //     </div>

    //     </>

    // );
}