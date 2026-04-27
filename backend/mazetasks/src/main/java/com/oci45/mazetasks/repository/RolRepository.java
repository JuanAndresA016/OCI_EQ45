package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RolRepository extends JpaRepository<Rol, Long> {

    List<Rol> findByProyectoId(Long proyectoId);
}