import * as React from 'react';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import "./TaskUser.css"

export default function TaskUser() {

    const getInitials = (name) => {
        if (!name) return "";

        const words = name.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0][0].toUpperCase();
        }

        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    // 🔹 Datos hardcodeados
    const dataArray = [
        { name: "Juan Pérez", value: 5 },
        { name: "María López", value: 8 },
        { name: "Carlos Sánchez", value: 3 },
        { name: "Ana Torres", value: 10 },
    ].map(item => ({
        ...item,
        initials: getInitials(item.name)
    }));

    const maxValue = Math.max(...dataArray.map(d => d.value), 1);

    return (
        <div className="taskUser_container">
            <div className="si">
                <span style={{ display: "block", textAlign: "center" }}>
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
                        {dataArray.map((item, index) => (
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
    );
}