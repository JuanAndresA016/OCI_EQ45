package com.oci45.mazetasks.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ROLES")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROL_ID")
    private Long id;

    @Column(name = "PROYECTO_ID")
    private Long proyectoId;

    @Column(name = "NOMBRE")
    private String nombre;

    public Rol() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProyectoId() { return proyectoId; }
    public void setProyectoId(Long proyectoId) { this.proyectoId = proyectoId; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}