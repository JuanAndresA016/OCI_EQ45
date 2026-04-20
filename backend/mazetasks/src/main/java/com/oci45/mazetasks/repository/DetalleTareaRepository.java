package com.oci45.mazetasks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.oci45.mazetasks.dto.TareaResumenDTO;
import com.oci45.mazetasks.model.DetalleTarea;
import org.springframework.data.jpa.repository.JpaRepository;import java.util.List;

public interface DetalleTareaRepository extends JpaRepository<DetalleTarea, Long> {

    @Query("SELECT new com.oci45.mazetasks.dto.TareaResumenDTO(COUNT(d), d.estado) " +
           "FROM DetalleTarea d GROUP BY d.estado")
    List<TareaResumenDTO> obtenerResumen();
}