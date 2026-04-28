package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.model.Tarea;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {

@Query(
  value = "SELECT T.* " +
          "FROM TAREAS T " +
          "JOIN PROYECTOS P ON P.PROYECTO_ID = T.PROYECTO_ID " +
          "WHERE T.PROYECTO_ID = :proyectoId " +
          "AND P.CREADOR_ID = :creadorId " +
          "AND T.PADRE_ID = :padreId",
  nativeQuery = true
)
List<Tarea> findTareasByProyectoAndCreadorAndPadre(
    @Param("proyectoId") Long proyectoId,
    @Param("creadorId") Long creadorId,
    @Param("padreId") Long padreId
);

@Query(value = """
    SELECT T.*
    FROM TAREAS T
    JOIN PROYECTOS P ON P.PROYECTO_ID = T.PROYECTO_ID
    WHERE T.PROYECTO_ID = :proyectoId
    AND P.CREADOR_ID = :creadorId
    AND T.PADRE_ID IS NULL
""", nativeQuery = true)
List<Tarea> findByProyectoAndCreador(Long proyectoId, Long creadorId);

@Query(value = """
   SELECT DISTINCT T.*
FROM TAREAS T
LEFT JOIN TAREASROLES TR ON TR.TAREA_ID = T.TAREA_ID
LEFT JOIN PERSONA_ROL PR ON PR.ROL_ID = TR.ROL_ID
WHERE T.PROYECTO_ID = :proyectoId
AND (
    PR.PERSONA_ID = :personaId
    OR TR.TAREA_ID IS NULL
)
AND T.PADRE_ID = :padreId
""", nativeQuery = true)
List<Tarea> findTareasByProyectoPersonaAndPadre(
        @Param("proyectoId") Long proyectoId,
        @Param("personaId") Long personaId,
        @Param("padreId") Long padreId
);

@Query(value = """
    SELECT DISTINCT T.*
FROM TAREAS T
LEFT JOIN TAREASROLES TR ON TR.TAREA_ID = T.TAREA_ID
LEFT JOIN PERSONA_ROL PR ON PR.ROL_ID = TR.ROL_ID
WHERE T.PROYECTO_ID = :proyectoId
AND (
    PR.PERSONA_ID = :personaId
    OR TR.TAREA_ID IS NULL
)
AND T.PADRE_ID IS NULL
""", nativeQuery = true)
List<Tarea> findTareasPadre(
        @Param("proyectoId") Long proyectoId,
        @Param("personaId") Long personaId
);


}