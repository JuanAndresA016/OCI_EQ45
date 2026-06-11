package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.dto.ComentarioTareaDTO;
import com.oci45.mazetasks.model.ComentarioTarea;
import com.oci45.mazetasks.service.ComentarioTareaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioTareaController {

    private final ComentarioTareaService service;

    public ComentarioTareaController(ComentarioTareaService service) {
        this.service = service;
    }

    @GetMapping("/tarea/{tareaId}")
    public List<ComentarioTareaDTO> obtenerPorTarea(@PathVariable Long tareaId) {
        return service.obtenerPorTarea(tareaId);
    }

    @PostMapping
    public ComentarioTarea crear(@RequestBody ComentarioTarea comentario) {
        return service.crear(comentario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}