package com.oci45.mazetasks.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "TAREASROLES")
@IdClass(TareaRolId.class)
public class TareaRol {

    @Id
    @Column(name = "TAREA_ID")
    private Long tareaId;

    @Id
    @Column(name = "ROL_ID")
    private Long rolId;

    // GETTERS Y SETTERS

    public Long getTareaId() { return tareaId; }
    public void setTareaId(Long tareaId) { this.tareaId = tareaId; }

    public Long getRolId() { return rolId; }
    public void setRolId(Long rolId) { this.rolId = rolId; }
}