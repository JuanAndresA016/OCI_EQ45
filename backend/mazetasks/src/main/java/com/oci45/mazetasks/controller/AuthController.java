package com.oci45.mazetasks.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oci45.mazetasks.model.Persona;
import com.oci45.mazetasks.repository.PersonaRepository;
import com.oci45.mazetasks.security.JwtUtil;
import com.oci45.mazetasks.service.PersonaService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private PersonaService personaService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PersonaRepository personaRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Persona persona) {

        Persona nueva = personaService.registrar(persona);
        nueva.setPassword(null);

        return ResponseEntity.ok(nueva);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Persona request) {

        Persona persona = personaService.login(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtUtil.generarToken(persona.getEmail());

        persona.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("usuario", persona);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String header) {

        String token = header.replace("Bearer ", "");
        String email = jwtUtil.extraerEmail(token);

        Persona persona = personaRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        persona.setPassword(null);

        return ResponseEntity.ok(persona);
    }
}