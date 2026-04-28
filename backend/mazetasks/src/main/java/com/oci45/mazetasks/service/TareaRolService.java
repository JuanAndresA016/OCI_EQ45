package com.oci45.mazetasks.service;

import com.oci45.mazetasks.model.TareaRol;
import com.oci45.mazetasks.repository.TareaRolRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TareaRolService {

    private final TareaRolRepository repo;

    public TareaRolService(TareaRolRepository repo) {
        this.repo = repo;
    }

    public List<TareaRol> getByTarea(Long tareaId) {
        return repo.findByTareaId(tareaId);
    }

    public void asignar(Long tareaId, Long rolId) {
        TareaRol tr = new TareaRol();
        tr.setTareaId(tareaId);
        tr.setRolId(rolId);
        repo.save(tr);
    }

    @Transactional
    public void eliminar(Long tareaId, Long rolId) {
        repo.deleteByTareaIdAndRolId(tareaId, rolId);
    }
}