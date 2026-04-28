package com.oci45.mazetasks.dto;

import java.time.LocalDate;

public class TareaDTO {

    private Long id;
    private String titulo;
    private String descripcion;
    private String estado;
    private String fechaCreacion;
    private String fechaLimite;
    private Long usuarioId;

    public TareaDTO(Long id, String titulo, String descripcion,
                    String estado, String fechaCreacion,
                    String fechaLimite, Long usuarioId) {

        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.fechaLimite = fechaLimite;
        this.usuarioId = usuarioId;
    }

    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescripcion() { return descripcion; }
    public String getEstado() { return estado; }
    public String getFechaCreacion() { return fechaCreacion; }
    public String getFechaLimite() { return fechaLimite; }
    public Long getUsuarioId() { return usuarioId; }
}