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


    @Query(value = """
        SELECT
            TS.TAREA_ID AS sprintId,
            TS.TITULO AS sprintTitulo,
            P.PERSONA_ID AS personaId,
            P.NOMBRE AS nombre,
            SUM(T.HORAS_TRABAJADAS) AS horas
        FROM TAREAS T
        JOIN TAREAS TS ON TS.TAREA_ID = COALESCE(T.PADRE_ID, T.TAREA_ID)
        JOIN TAREASROLES TR ON TR.TAREA_ID = T.TAREA_ID
        JOIN PERSONA_ROL PR ON TR.ROL_ID = PR.ROL_ID
        JOIN PERSONAS P ON P.PERSONA_ID = PR.PERSONA_ID
        WHERE T.PROYECTO_ID = :proyectoId
          AND TS.PADRE_ID IS NULL
        GROUP BY TS.TAREA_ID, TS.TITULO, P.PERSONA_ID, P.NOMBRE
        ORDER BY TS.TAREA_ID, P.PERSONA_ID
        """, nativeQuery = true)
    List<Object[]> obtenerHorasPorSprint(@Param("proyectoId") Long proyectoId);


    @Query(value = """
        SELECT
            TS.TAREA_ID AS sprintId,
            TS.TITULO AS sprintTitulo,
            P.PERSONA_ID AS personaId,
            P.NOMBRE AS nombre,
            COUNT(T.TAREA_ID) AS tareasCompletadas
        FROM TAREAS T
        JOIN TAREAS TS ON TS.TAREA_ID = COALESCE(T.PADRE_ID, T.TAREA_ID)
        JOIN TAREASROLES TR ON TR.TAREA_ID = T.TAREA_ID
        JOIN PERSONA_ROL PR ON TR.ROL_ID = PR.ROL_ID
        JOIN PERSONAS P ON P.PERSONA_ID = PR.PERSONA_ID
        WHERE T.PROYECTO_ID = :proyectoId
          AND TS.PADRE_ID IS NULL
          AND T.ESTADO = 'COMPLETADA'
        GROUP BY TS.TAREA_ID, TS.TITULO, P.PERSONA_ID, P.NOMBRE
        ORDER BY TS.TAREA_ID, P.PERSONA_ID
        """, nativeQuery = true)
    List<Object[]> obtenerTareasCompletadas(@Param("proyectoId") Long proyectoId);


}