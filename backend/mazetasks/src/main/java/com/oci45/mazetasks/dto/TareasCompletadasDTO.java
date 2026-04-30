package com.oci45.mazetasks.dto;

public class TareasCompletadasDTO {

    private Long sprintId;
    private String sprintTitulo;
    private Long personaId;
    private String nombre;
    private Long tareasCompletadas;

    public TareasCompletadasDTO(Long sprintId, String sprintTitulo,
                                Long personaId, String nombre, Long tareasCompletadas) {
        this.sprintId = sprintId;
        this.sprintTitulo = sprintTitulo;
        this.personaId = personaId;
        this.nombre = nombre;
        this.tareasCompletadas = tareasCompletadas;
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

    public Long getTareasCompletadas() {
        return tareasCompletadas;
    }
}