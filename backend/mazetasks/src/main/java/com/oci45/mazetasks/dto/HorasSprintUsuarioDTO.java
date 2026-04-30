package com.oci45.mazetasks.dto;

public class HorasSprintUsuarioDTO {

    private Long sprintId;
    private String sprintTitulo;
    private Long personaId;
    private String nombre;
    private Double horas;

    public HorasSprintUsuarioDTO(Long sprintId, String sprintTitulo,
                                 Long personaId, String nombre, Double horas) {
        this.sprintId = sprintId;
        this.sprintTitulo = sprintTitulo;
        this.personaId = personaId;
        this.nombre = nombre;
        this.horas = horas;
    }

    public Long getSprintId() {
        return sprintId;
    }

    public String getSprintTitulo() {
        return sprintTitulo;
    }

    public Long getPersonaId() {
        return personaId;
    }

    public String getNombre() {
        return nombre;
    }

    public Double getHoras() {
        return horas;
    }
}