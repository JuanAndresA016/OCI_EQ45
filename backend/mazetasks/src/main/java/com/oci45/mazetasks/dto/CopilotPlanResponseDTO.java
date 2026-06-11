package com.oci45.mazetasks.dto;

import java.util.ArrayList;
import java.util.List;

public class CopilotPlanResponseDTO {

    private Boolean necesitaMasContexto = false;
    private List<String> preguntas = new ArrayList<>();
    private String resumen;
    private List<CopilotRolPlanDTO> roles = new ArrayList<>();
    private List<CopilotTareaPlanDTO> tareas = new ArrayList<>();
    private Long tareaPadreId;

public Long getTareaPadreId() {
    return tareaPadreId;
}

public void setTareaPadreId(Long tareaPadreId) {
    this.tareaPadreId = tareaPadreId;
}

    public Boolean getNecesitaMasContexto() {
        return necesitaMasContexto;
    }

    public void setNecesitaMasContexto(Boolean necesitaMasContexto) {
        this.necesitaMasContexto = necesitaMasContexto;
    }

    public List<String> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<String> preguntas) {
        this.preguntas = preguntas;
    }

    public String getResumen() {
        return resumen;
    }

    public void setResumen(String resumen) {
        this.resumen = resumen;
    }

    public List<CopilotRolPlanDTO> getRoles() {
        return roles;
    }

    public void setRoles(List<CopilotRolPlanDTO> roles) {
        this.roles = roles;
    }

    public List<CopilotTareaPlanDTO> getTareas() {
        return tareas;
    }

    public void setTareas(List<CopilotTareaPlanDTO> tareas) {
        this.tareas = tareas;
    }
}