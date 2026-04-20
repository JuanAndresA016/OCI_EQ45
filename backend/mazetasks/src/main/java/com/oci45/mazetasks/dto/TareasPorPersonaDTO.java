package com.oci45.mazetasks.dto;


public class TareasPorPersonaDTO {

    private String name;
    private Long value;

    public TareasPorPersonaDTO(String name, Long value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public Long getValue() {
        return value;
    }
}