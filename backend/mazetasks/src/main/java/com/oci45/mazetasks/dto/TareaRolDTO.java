package com.oci45.mazetasks.dto;

public class TareaRolDTO {

    private Long id;
    private Long tareaId;
    private Long rolId;
    private String nombreRol;

    public TareaRolDTO(Long id, Long tareaId, Long rolId, String nombreRol) {
        this.id = id;
        this.tareaId = tareaId;
        this.rolId = rolId;
        this.nombreRol = nombreRol;
    }

    public Long getId() { return id; }
    public Long getTareaId() { return tareaId; }
    public Long getRolId() { return rolId; }
    public String getNombreRol() { return nombreRol; }
}