package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.dto.ProyectoDTO;
import com.oci45.mazetasks.model.Proyecto;
import com.oci45.mazetasks.service.ProyectoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    @GetMapping("/creador/{creadorId}")
    public List<ProyectoDTO> obtenerProyectosConMiembros(
            @PathVariable Long creadorId) {

        return proyectoService.obtenerProyectosConMiembros(creadorId);
    }

    @GetMapping("/miembro/{personaId}")
public List<Proyecto> obtenerProyectosPorPersona(@PathVariable Long personaId) {
    return proyectoService.obtenerProyectosPorPersona(personaId);
}

@PostMapping
public Proyecto crearProyecto(@RequestBody Proyecto proyecto) {
    return proyectoService.crearProyecto(proyecto);
}

@PutMapping("/{id}")
public Proyecto actualizarProyecto(
        @PathVariable Long id,
        @RequestBody Proyecto proyecto) {
    return proyectoService.actualizarProyecto(id, proyecto);
}

@DeleteMapping("/{id}")
public void eliminarProyecto(@PathVariable Long id) {
    proyectoService.eliminarProyecto(id);
}
}