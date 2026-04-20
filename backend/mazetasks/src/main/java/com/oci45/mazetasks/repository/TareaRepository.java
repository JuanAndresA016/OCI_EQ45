package com.oci45.mazetasks.repository;
import com.oci45.mazetasks.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {

    @Query(value = """
        SELECT p.NOMBRE AS name, COUNT(*) AS value
        FROM TAREAS tt
        JOIN TAREASPERSONAS t ON t.TAREA_ID = tt.TAREA_ID
        JOIN PERSONAS p ON p.PERSONA_ID = t.PERSONA_ID
        GROUP BY p.NOMBRE
        ORDER BY value DESC
        """, nativeQuery = true)
    List<Object[]> obtenerTareasPorPersona();
}
