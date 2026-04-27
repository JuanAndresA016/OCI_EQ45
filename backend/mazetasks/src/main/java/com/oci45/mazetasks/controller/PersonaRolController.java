package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.service.PersonaRolService;
import com.oci45.mazetasks.dto.PersonaRolDTO;
import com.oci45.mazetasks.model.PersonaRol;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persona-rol")
public class PersonaRolController {

    private final PersonaRolService service;

    public PersonaRolController(PersonaRolService service) {
        this.service = service;
    }

    

    @GetMapping("/{proyectoId}")
    public List<PersonaRolDTO> obtener(@PathVariable Long proyectoId) {
        return service.obtener(proyectoId);
    }

    @PostMapping
    public void asignar(@RequestBody PersonaRol pr) {
        service.asignar(pr.getPersonaId(), pr.getRolId());
    }

    @DeleteMapping
    public void eliminar(
            @RequestParam Long personaId,
            @RequestParam Long rolId
    ) {
        service.eliminar(personaId, rolId);
    }
}