package com.oci45.mazetasks.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CopilotTareaPlanDTO {

    private String titulo;
    private String descripcion;
    private String estado = "PENDIENTE";
    private String tipoMedicion = "HORAS";
    private Integer horasTrabajadas = 0;
    private String rolSugerido;
    private List<CopilotTareaPlanDTO> subtareas = new ArrayList<>();

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getTipoMedicion() {
        return tipoMedicion;
    }

    public void setTipoMedicion(String tipoMedicion) {
        this.tipoMedicion = tipoMedicion;
    }

    public Integer getHorasTrabajadas() {
        return horasTrabajadas;
    }

    public void setHorasTrabajadas(Integer horasTrabajadas) {
        this.horasTrabajadas = horasTrabajadas;
    }

    public String getRolSugerido() {
        return rolSugerido;
    }

    public void setRolSugerido(String rolSugerido) {
        this.rolSugerido = rolSugerido;
    }

    public List<CopilotTareaPlanDTO> getSubtareas() {
        return subtareas;
    }

    public void setSubtareas(List<CopilotTareaPlanDTO> subtareas) {
        this.subtareas = subtareas;
    }
}