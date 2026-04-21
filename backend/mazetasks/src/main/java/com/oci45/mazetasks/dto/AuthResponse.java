package com.oci45.mazetasks.dto;

public class AuthResponse {

    private String token;
    private Object usuario;

    public AuthResponse(String token, Object usuario) {
        this.token = token;
        this.usuario = usuario;
    }

    public String getToken() { return token; }
    public Object getUsuario() { return usuario; }
}