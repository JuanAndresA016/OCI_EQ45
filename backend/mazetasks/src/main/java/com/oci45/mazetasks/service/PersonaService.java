package com.oci45.mazetasks.service;

import com.oci45.mazetasks.model.Persona;
import com.oci45.mazetasks.repository.PersonaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Persona registrar(Persona persona) {

        if (personaRepository.findByEmail(persona.getEmail()).isPresent()) {
            throw new RuntimeException("El correo ya existe");
        }

        // 🔐 hash password
        persona.setPassword(passwordEncoder.encode(persona.getPassword()));

        return personaRepository.save(persona);
    }

    public Persona login(String email, String password) {

        Persona persona = personaRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, persona.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return persona;
    }
}