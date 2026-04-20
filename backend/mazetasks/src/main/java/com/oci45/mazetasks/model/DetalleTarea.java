package com.oci45.mazetasks.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "DETALLETAREA")
public class DetalleTarea {

    @Id
    @Column(name = "DETALLE_ID")
    private Long id;

    @Column(name = "PASO")
    private String paso;

    @Column(name = "NUM_PASO")
    private Integer numPaso;

    @Column(name = "ESTADO")
    private String estado;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPaso() { return paso; }
    public void setPaso(String paso) { this.paso = paso; }

    public Integer getNumPaso() { return numPaso; }
    public void setNumPaso(Integer numPaso) { this.numPaso = numPaso; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}