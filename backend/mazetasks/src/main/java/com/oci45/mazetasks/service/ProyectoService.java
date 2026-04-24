package com.oci45.mazetasks.service;

import com.oci45.mazetasks.dto.ProyectoDTO;
import com.oci45.mazetasks.model.Proyecto;
import com.oci45.mazetasks.repository.ProyectoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;

    public List<ProyectoDTO> obtenerProyectosConMiembros(Long creadorId) {

        List<Object[]> rows = proyectoRepository.obtenerProyectosConMiembrosRaw(creadorId);
        List<ProyectoDTO> resultado = new ArrayList<>();

        for (Object[] row : rows) {

            ProyectoDTO dto = new ProyectoDTO(
                    ((Number) row[0]).longValue(),
                    (String) row[1],
                    (String) row[2],
                    ((java.time.LocalDateTime) row[3]).toString(),
                    ((java.time.LocalDateTime) row[4]).toString(),
                    ((Number) row[5]).longValue(),
                    ((Number) row[6]).longValue()
            );

            resultado.add(dto);
        }

        return resultado;
    }

    public List<Proyecto> obtenerProyectosPorPersona(Long personaId) {
    return proyectoRepository.obtenerProyectosPorPersona(personaId);
}

public Proyecto crearProyecto(Proyecto proyecto) {
    return proyectoRepository.save(proyecto);
}

public Proyecto actualizarProyecto(Long id, Proyecto proyectoActualizado) {
    Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

    proyecto.setNombre(proyectoActualizado.getNombre());
    proyecto.setDescripcion(proyectoActualizado.getDescripcion());
    proyecto.setFechaInicio(proyectoActualizado.getFechaInicio());
    proyecto.setFechaFin(proyectoActualizado.getFechaFin());

    return proyectoRepository.save(proyecto);
}

public void eliminarProyecto(Long id) {
    if (!proyectoRepository.existsById(id)) {
        throw new RuntimeException("Proyecto no encontrado");
    }
    proyectoRepository.deleteById(id);
}
}