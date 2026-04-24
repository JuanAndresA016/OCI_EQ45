package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.dto.ProyectoDTO;
import com.oci45.mazetasks.model.Proyecto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {

    @Query(value = """
        SELECT 
            P.PROYECTO_ID,
            P.NOMBRE,
            P.DESCRIPCION,
            P.FECHA_INICIO,
            P.FECHA_FIN,
            P.CREADOR_ID,
            COUNT(PP.PERSONA_ID) AS miembros
        FROM PROYECTOS P
        LEFT JOIN PERSONAS_PROYECTOS PP 
            ON PP.PROYECTO_ID = P.PROYECTO_ID
        WHERE P.CREADOR_ID = :creadorId
        GROUP BY 
            P.PROYECTO_ID,
            P.NOMBRE,
            P.DESCRIPCION,
            P.FECHA_INICIO,
            P.FECHA_FIN,
            P.CREADOR_ID
        """, nativeQuery = true)
    List<Object[]> obtenerProyectosConMiembrosRaw(Long creadorId);


    @Query(value = """
    SELECT DISTINCT P.*
    FROM PROYECTOS P
    JOIN PERSONAS_PROYECTOS PP 
        ON PP.PROYECTO_ID = P.PROYECTO_ID
    WHERE PP.PERSONA_ID = :personaId
    """, nativeQuery = true)
List<Proyecto> obtenerProyectosPorPersona(Long personaId);
}