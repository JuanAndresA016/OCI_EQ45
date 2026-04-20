package com.oci45.mazetasks.service;

import java.util.List;
    import java.util.List;

import org.springframework.stereotype.Service;

import com.oci45.mazetasks.dto.TareaResumenDTO;
import com.oci45.mazetasks.model.DetalleTarea;
import com.oci45.mazetasks.repository.DetalleTareaRepository;

@Service
public class DetalleTareaService {

    private final DetalleTareaRepository repository;

    public DetalleTareaService(DetalleTareaRepository repository) {
        this.repository = repository;
    }

    public List<DetalleTarea> getAll() {
        return repository.findAll();
    }

    public DetalleTarea getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public DetalleTarea save(DetalleTarea tarea) {
        return repository.save(tarea);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }



public List<TareaResumenDTO> getResumen() {
    return repository.obtenerResumen();
}
}