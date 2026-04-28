package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.model.TareaRol;
import com.oci45.mazetasks.model.TareaRolId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareaRolRepository extends JpaRepository<TareaRol, TareaRolId> {

    List<TareaRol> findByTareaId(Long tareaId);

    void deleteByTareaIdAndRolId(Long tareaId, Long rolId);
}