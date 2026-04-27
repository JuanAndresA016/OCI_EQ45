package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.model.PersonasProyectos;
import com.oci45.mazetasks.model.PersonasProyectosId;
import com.oci45.mazetasks.dto.PersonaProyectoDTO;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PersonasProyectosRepository
        extends JpaRepository<PersonasProyectos, PersonasProyectosId> {

    @Query("""
    SELECT new com.oci45.mazetasks.dto.PersonaProyectoDTO(p.id, p.nombre, p.email)
    FROM PersonasProyectos pp
    JOIN Persona p ON p.id = pp.personaId
    JOIN Proyecto py ON py.id = pp.proyectoId
    WHERE py.id = :proyectoId AND py.creadorId = :creadorId
""")
    List<PersonaProyectoDTO> obtenerMiembros(
            @Param("proyectoId") Long proyectoId,
            @Param("creadorId") Long creadorId
    );

    boolean existsByPersonaIdAndProyectoId(Long personaId, Long proyectoId);

    @Modifying
    @Transactional
    @Query("""
    DELETE FROM PersonasProyectos pp
    WHERE pp.personaId = :personaId
    AND pp.proyectoId = :proyectoId
""")
    void deleteByPersonaIdAndProyectoId(
            @Param("personaId") Long personaId,
            @Param("proyectoId") Long proyectoId
    );
}