package com.oci45.mazetasks.service;

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
}