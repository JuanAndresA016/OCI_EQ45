package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.dto.ComentarioTareaDTO;
import com.oci45.mazetasks.model.ComentarioTarea;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComentarioTareaRepository extends JpaRepository<ComentarioTarea, Long> {

    @Query("""
        SELECT new com.oci45.mazetasks.dto.ComentarioTareaDTO(
            c.id,
            c.tareaId,
            c.personaId,
            CONCAT(p.nombre, CONCAT(' ', p.apellido)),
            c.contenido,
            c.fechaCreacion
        )
        FROM ComentarioTarea c
        JOIN Persona p ON p.id = c.personaId
        WHERE c.tareaId = :tareaId
        ORDER BY c.fechaCreacion ASC
    """)
    List<ComentarioTareaDTO> obtenerPorTarea(@Param("tareaId") Long tareaId);
}