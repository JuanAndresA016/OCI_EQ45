package com.oci45.mazetasks.dto;

import java.time.LocalDateTime;

public class ComentarioTareaDTO {

    private Long id;
    private Long tareaId;
    private Long personaId;
    private String nombrePersona;
    private String contenido;
    private LocalDateTime fechaCreacion;

    public ComentarioTareaDTO(
            Long id,
            Long tareaId,
            Long personaId,
            String nombrePersona,
            String contenido,
            LocalDateTime fechaCreacion
    ) {
        this.id = id;
        this.tareaId = tareaId;
        this.personaId = personaId;
        this.nombrePersona = nombrePersona;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
    }

    public Long getId() {
        return id;
    }

    public Long getTareaId() {
        return tareaId;
    }

    public Long getPersonaId() {
        return personaId;
    }

    public String getNombrePersona() {
        return nombrePersona;
    }

    public String getContenido() {
        return contenido;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
}