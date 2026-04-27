package com.oci45.mazetasks.model;

import jakarta.persistence.*;

@Entity
@Table(name = "PERSONAS_PROYECTOS")
@IdClass(PersonasProyectosId.class)
public class PersonasProyectos {

    @Id
    @Column(name = "PERSONA_ID")
    private Long personaId;

    @Id
    @Column(name = "PROYECTO_ID")
    private Long proyectoId;

    public PersonasProyectos() {}

    public Long getPersonaId() { return personaId; }
    public void setPersonaId(Long personaId) { this.personaId = personaId; }

    public Long getProyectoId() { return proyectoId; }
    public void setProyectoId(Long proyectoId) { this.proyectoId = proyectoId; }
}