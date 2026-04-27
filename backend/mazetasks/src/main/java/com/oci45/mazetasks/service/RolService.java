package com.oci45.mazetasks.service;

import com.oci45.mazetasks.model.Rol;
import com.oci45.mazetasks.repository.RolRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {

    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public List<Rol> obtenerPorProyecto(Long proyectoId) {
        return rolRepository.findByProyectoId(proyectoId);
    }

    public Rol crear(Rol rol) {
        return rolRepository.save(rol);
    }

    public Rol actualizar(Long id, Rol rol) {
        Rol existente = rolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        existente.setNombre(rol.getNombre());
        existente.setProyectoId(rol.getProyectoId());

        return rolRepository.save(existente);
    }

    public void eliminar(Long id) {
        rolRepository.deleteById(id);
    }
}