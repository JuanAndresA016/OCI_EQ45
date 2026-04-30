package com.oci45.mazetasks.service;

import com.oci45.mazetasks.dto.HorasSprintUsuarioDTO;
import com.oci45.mazetasks.dto.TareasCompletadasDTO;
import com.oci45.mazetasks.model.Tarea;
import com.oci45.mazetasks.repository.TareaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareaService {

    private final TareaRepository repo;

    public TareaService(TareaRepository repo) {
        this.repo = repo;
    }

    public List<Tarea> getByProyecto(Long proyectoId, Long creadorId) {
        return repo.findByProyectoAndCreador(proyectoId, creadorId);
    }

    public Tarea crear(Tarea tarea) {
        return repo.save(tarea);
    }

    public Tarea actualizar(Long id, Tarea nueva) {
        Tarea t = repo.findById(id).orElseThrow();

        t.setTitulo(nueva.getTitulo());
        t.setDescripcion(nueva.getDescripcion());
        t.setEstado(nueva.getEstado());
        t.setTipoMedicion(nueva.getTipoMedicion());
        t.setHorasTrabajadas(nueva.getHorasTrabajadas());
        t.setFechaInicio(nueva.getFechaInicio());
        t.setFechaFin(nueva.getFechaFin());
        t.setFechaFinReal(nueva.getFechaFinReal());
        t.setPadreId(nueva.getPadreId());

        return repo.save(t);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public List<Tarea> obtenerTareas(Long proyectoId, Long creadorId, Long padreId) {
        return repo.findTareasByProyectoAndCreadorAndPadre(
                proyectoId, creadorId, padreId);
    }

    public Tarea obtenerPorId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));
    }

    public List<Tarea> obtenerTareasConPadre(Long proyectoId, Long personaId, Long padreId) {
        return repo.findTareasByProyectoPersonaAndPadre(proyectoId, personaId, padreId);
    }

    public List<Tarea> obtenerTareasPadre(Long proyectoId, Long personaId) {
        return repo.findTareasPadre(proyectoId, personaId);
    }

    public List<HorasSprintUsuarioDTO> getHorasPorSprint(Long proyectoId) {
        return repo.obtenerHorasPorSprint(proyectoId)
                .stream()
                .map(r -> new HorasSprintUsuarioDTO(
                        ((Number) r[0]).longValue(),
                        (String) r[1],
                        ((Number) r[2]).longValue(),
                        (String) r[3],
                        r[4] != null ? ((Number) r[4]).doubleValue() : 0.0))
                .toList();
    }

    public List<TareasCompletadasDTO> getTareasCompletadas(Long proyectoId) {
        return repo.obtenerTareasCompletadas(proyectoId)
                .stream()
                .map(r -> new TareasCompletadasDTO(
                        ((Number) r[0]).longValue(),
                        (String) r[1],
                        ((Number) r[2]).longValue(),
                        (String) r[3],
                        ((Number) r[4]).longValue()))
                .toList();
    }
}