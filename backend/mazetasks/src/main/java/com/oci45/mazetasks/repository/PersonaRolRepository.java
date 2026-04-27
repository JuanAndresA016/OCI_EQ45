package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.model.PersonaRol;
import com.oci45.mazetasks.model.PersonaRolId;
import com.oci45.mazetasks.dto.PersonaRolDTO;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PersonaRolRepository extends JpaRepository<PersonaRol, PersonaRolId> {

    @Query("""
        SELECT new com.oci45.mazetasks.dto.PersonaRolDTO(
            p.id, p.nombre, p.email,
            r.id, r.nombre
        )
        FROM PersonaRol pr
        JOIN Persona p ON p.id = pr.personaId
        JOIN Rol r ON r.id = pr.rolId
        WHERE r.proyectoId = :proyectoId
    """)
    List<PersonaRolDTO> obtenerPorProyecto(@Param("proyectoId") Long proyectoId);

    boolean existsByPersonaIdAndRolId(Long personaId, Long rolId);

    void deleteByPersonaIdAndRolId(Long personaId, Long rolId);
}