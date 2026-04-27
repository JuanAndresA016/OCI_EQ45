package com.oci45.mazetasks.dto;

public class PersonaRolDTO {

    private Long personaId;
    private String nombre;
    private String email;
    private Long rolId;
    private String rolNombre;

    public PersonaRolDTO(Long personaId, String nombre, String email, Long rolId, String rolNombre) {
        this.personaId = personaId;
        this.nombre = nombre;
        this.email = email;
        this.rolId = rolId;
        this.rolNombre = rolNombre;
    }

    public Long getPersonaId() { return personaId; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
    public Long getRolId() { return rolId; }
    public String getRolNombre() { return rolNombre; }
}