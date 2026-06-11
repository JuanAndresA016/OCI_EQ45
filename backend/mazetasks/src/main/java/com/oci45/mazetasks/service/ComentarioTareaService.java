package com.oci45.mazetasks.service;

import com.oci45.mazetasks.dto.ComentarioTareaDTO;
import com.oci45.mazetasks.model.ComentarioTarea;
import com.oci45.mazetasks.repository.ComentarioTareaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComentarioTareaService {

    private final ComentarioTareaRepository repo;

    public ComentarioTareaService(ComentarioTareaRepository repo) {
        this.repo = repo;
    }

    public List<ComentarioTareaDTO> obtenerPorTarea(Long tareaId) {
        return repo.obtenerPorTarea(tareaId);
    }

    public ComentarioTarea crear(ComentarioTarea comentario) {
        if (comentario.getContenido() == null || comentario.getContenido().isBlank()) {
            throw new RuntimeException("El comentario no puede estar vacío");
        }

        comentario.setFechaCreacion(LocalDateTime.now());

        return repo.save(comentario);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}