// PersonaRolId.java
package com.oci45.mazetasks.model;

import java.io.Serializable;
import java.util.Objects;

public class PersonaRolId implements Serializable {

    private Long personaId;
    private Long rolId;

    public PersonaRolId() {}

    public PersonaRolId(Long personaId, Long rolId) {
        this.personaId = personaId;
        this.rolId = rolId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PersonaRolId)) return false;
        PersonaRolId that = (PersonaRolId) o;
        return Objects.equals(personaId, that.personaId) &&
               Objects.equals(rolId, that.rolId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(personaId, rolId);
    }
}