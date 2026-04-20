package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.dto.TareasPorPersonaDTO;
import com.oci45.mazetasks.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @GetMapping("/por-persona")
    public List<TareasPorPersonaDTO> obtenerTareasPorPersona() {
        return tareaService.getTareasPorPersona();
    }
}