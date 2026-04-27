// PersonaRol.java
package com.oci45.mazetasks.model;

import jakarta.persistence.*;

@Entity
@Table(name = "PERSONA_ROL")
@IdClass(PersonaRolId.class)
public class PersonaRol {

    @Id
    @Column(name = "PERSONA_ID")
    private Long personaId;

    @Id
    @Column(name = "ROL_ID")
    private Long rolId;

    public Long getPersonaId() { return personaId; }
    public void setPersonaId(Long personaId) { this.personaId = personaId; }

    public Long getRolId() { return rolId; }
    public void setRolId(Long rolId) { this.rolId = rolId; }
}