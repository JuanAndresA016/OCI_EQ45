package com.oci45.mazetasks.dto;

public class TareaResumenDTO {

    private Long cantidadTareas;
    private String estadoTarea;

    public TareaResumenDTO(Long cantidadTareas, String estadoTarea) {
        this.cantidadTareas = cantidadTareas;
        this.estadoTarea = estadoTarea;
    }

    public Long getCantidadTareas() { return cantidadTareas; }
    public String getEstadoTarea() { return estadoTarea; }
}