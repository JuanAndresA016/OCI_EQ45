import * as React from 'react';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import "./TaskUser.css"
const data = [
    { name: 'Carlos Mendoza', value: 4, initials: 'CM' },
    { name: 'Angela Garcia', value: 3, initials: 'AG' },
    { name: 'Victor Lopez', value: 2, initials: 'VL' },
    { name: 'Sofía Martínez', value: 1, initials: 'SM' },
];

const maxValue = Math.max(...data.map((d) => d.value));

export default function TaskUser() {
    return (
        <>

            <div className="taskUser_container">
                <div className="si">
                    <span style={{display: "block", textAlign: "Center" }}>
                        Productividad del equipo
                    </span>

                    <Box
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        width: 600,


                    }}
                >
                    

                    <Stack spacing={2}>
                        {data.map((item, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                {/* Avatar */}
                                <Avatar sx={{ bgcolor: '#4f46e5' }}>
                                    {item.initials}
                                </Avatar>

                                {/* Nombre */}
                                <Typography sx={{ width: 180 }}>
                                    {item.name}
                                </Typography>

                                {/* Barra */}
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        height: 20,
                                        backgroundColor: '#e5e7eb',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${(item.value / maxValue) * 100}%`,
                                            height: '100%',
                                            background: 'linear-gradient(90deg, #4f46e5, #6366f1)',
                                            borderRadius: 2,
                                        }}
                                    />
                                </Box>

                                {/* Texto derecha */}
                                <Typography sx={{ width: 150, fontSize: 14, color: '#666' }}>
                                    {item.value} {item.value === 1 ? 'tarea completada' : 'tareas completadas'}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
                </div>
                
            </div>

        </>

    );
}