package com.oci45.mazetasks.service;

import com.oci45.mazetasks.model.PersonaRol;
import com.oci45.mazetasks.dto.PersonaRolDTO;
import com.oci45.mazetasks.repository.PersonaRolRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PersonaRolService {

    private final PersonaRolRepository repository;

    public PersonaRolService(PersonaRolRepository repository) {
        this.repository = repository;
    }

    // 🔹 OBTENER POR PROYECTO
    public List<PersonaRolDTO> obtener(Long proyectoId) {
        return repository.obtenerPorProyecto(proyectoId);
    }

    // 🔹 ASIGNAR ROL
    @Transactional
    public void asignar(Long personaId, Long rolId) {

        // 🔥 Evitar duplicados
        boolean existe = repository.existsByPersonaIdAndRolId(personaId, rolId);

        if (existe) {
            throw new RuntimeException("Ya tiene ese rol");
        }

        PersonaRol pr = new PersonaRol();
        pr.setPersonaId(personaId);
        pr.setRolId(rolId);

        repository.save(pr);
    }

    // 🔹 ELIMINAR ROL
    @Transactional
    public void eliminar(Long personaId, Long rolId) {

        boolean existe = repository.existsByPersonaIdAndRolId(personaId, rolId);

        if (!existe) {
            throw new RuntimeException("No existe esa asignación");
        }

        repository.deleteByPersonaIdAndRolId(personaId, rolId);
    }
}