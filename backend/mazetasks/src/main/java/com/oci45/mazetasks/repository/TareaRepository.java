package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.model.Tarea;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {

@Query(value = """
    SELECT T.*
    FROM TAREAS T
    JOIN PROYECTOS P ON P.PROYECTO_ID = T.PROYECTO_ID
    WHERE T.PROYECTO_ID = :proyectoId
    AND P.CREADOR_ID = :creadorId
""", nativeQuery = true)
List<Tarea> findByProyectoAndCreador(Long proyectoId, Long creadorId);
}