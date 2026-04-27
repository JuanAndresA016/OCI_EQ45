package com.oci45.mazetasks.service;

import com.oci45.mazetasks.repository.*;
import com.oci45.mazetasks.model.*;
import com.oci45.mazetasks.dto.PersonaProyectoDTO;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonasProyectosService {

    private final PersonasProyectosRepository ppRepo;
    private final PersonaRepository personaRepo;
    private final ProyectoRepository proyectoRepo;

    public PersonasProyectosService(
            PersonasProyectosRepository ppRepo,
            PersonaRepository personaRepo,
            ProyectoRepository proyectoRepo
    ) {
        this.ppRepo = ppRepo;
        this.personaRepo = personaRepo;
        this.proyectoRepo = proyectoRepo;
    }

    // 🔹 GET miembros
    public List<PersonaProyectoDTO> obtenerMiembros(Long proyectoId, Long creadorId) {
        return ppRepo.obtenerMiembros(proyectoId, creadorId);
    }

    // 🔹 AGREGAR por email
    public void agregarPersonaPorEmail(String email, Long proyectoId, Long creadorId) {

        Proyecto proyecto = proyectoRepo.findById(proyectoId)
                .orElseThrow(() -> new RuntimeException("Proyecto no existe"));

        if (!proyecto.getCreadorId().equals(creadorId)) {
            throw new RuntimeException("No autorizado");
        }

        Persona persona = personaRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("El usuario no existe"));

        if (ppRepo.existsByPersonaIdAndProyectoId(persona.getId(), proyectoId)) {
            throw new RuntimeException("Ya pertenece al proyecto");
        }

        PersonasProyectos pp = new PersonasProyectos();
        pp.setPersonaId(persona.getId());
        pp.setProyectoId(proyectoId);

        ppRepo.save(pp);
    }

    // 🔹 DELETE
    public void eliminar(Long personaId, Long proyectoId) {
        ppRepo.deleteByPersonaIdAndProyectoId(personaId, proyectoId);
    }
}