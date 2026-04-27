package com.oci45.mazetasks.model;

import java.io.Serializable;
import java.util.Objects;

public class PersonasProyectosId implements Serializable {

    private Long personaId;
    private Long proyectoId;

    public PersonasProyectosId() {}

    public PersonasProyectosId(Long personaId, Long proyectoId) {
        this.personaId = personaId;
        this.proyectoId = proyectoId;
    }

    public Long getPersonaId() { return personaId; }
    public void setPersonaId(Long personaId) { this.personaId = personaId; }

    public Long getProyectoId() { return proyectoId; }
    public void setProyectoId(Long proyectoId) { this.proyectoId = proyectoId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PersonasProyectosId)) return false;
        PersonasProyectosId that = (PersonasProyectosId) o;
        return Objects.equals(personaId, that.personaId) &&
               Objects.equals(proyectoId, that.proyectoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(personaId, proyectoId);
    }
}