package com.oci45.mazetasks.dto;

public class TareaSimilarDTO {

    private Long tareaId;
    private String titulo;
    private String descripcion;
    private Double similitud;

    public TareaSimilarDTO(Long tareaId, String titulo, String descripcion, Double similitud) {
        this.tareaId = tareaId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.similitud = similitud;
    }

    public Long getTareaId() {
        return tareaId;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Double getSimilitud() {
        return similitud;
    }
}