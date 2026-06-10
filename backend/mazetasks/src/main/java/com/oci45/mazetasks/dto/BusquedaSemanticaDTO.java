package com.oci45.mazetasks.dto;

public class BusquedaSemanticaDTO {
    private String texto;
    private Integer limite;

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Integer getLimite() {
        return limite;
    }

    public void setLimite(Integer limite) {
        this.limite = limite;
    }
}