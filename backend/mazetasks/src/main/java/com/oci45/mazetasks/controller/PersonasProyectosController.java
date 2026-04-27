package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.service.PersonasProyectosService;
import com.oci45.mazetasks.dto.PersonaProyectoDTO;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/personas-proyectos")
@CrossOrigin
public class PersonasProyectosController {

    private final PersonasProyectosService service;

    public PersonasProyectosController(PersonasProyectosService service) {
        this.service = service;
    }

    // 🔹 GET
    @GetMapping("/{proyectoId}/{creadorId}")
    public List<PersonaProyectoDTO> obtenerMiembros(
            @PathVariable Long proyectoId,
            @PathVariable Long creadorId
    ) {
        return service.obtenerMiembros(proyectoId, creadorId);
    }

    // 🔹 POST (solo email)
    @PostMapping
    public void agregar(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        Long proyectoId = Long.parseLong(body.get("proyectoId"));
        Long creadorId = Long.parseLong(body.get("creadorId"));

        service.agregarPersonaPorEmail(email, proyectoId, creadorId);
    }

    // 🔹 DELETE
    @DeleteMapping
    public void eliminar(
            @RequestParam Long personaId,
            @RequestParam Long proyectoId
    ) {
        service.eliminar(personaId, proyectoId);
    }
}