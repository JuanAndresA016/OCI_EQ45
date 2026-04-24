package com.oci45.mazetasks.dto;

public class ProyectoDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private String fechaInicio;
    private String fechaFin;
    private Long creadorId;
    private Long miembros;

    public ProyectoDTO(Long id, String nombre, String descripcion,
                                  String fechaInicio, String fechaFin,
                                  Long creadorId, Long miembros) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.creadorId = creadorId;
        this.miembros = miembros;
    }

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getDescripcion() { return descripcion; }
    public String getFechaInicio() { return fechaInicio; }
    public String getFechaFin() { return fechaFin; }
    public Long getCreadorId() { return creadorId; }
    public Long getMiembros() { return miembros; }
}