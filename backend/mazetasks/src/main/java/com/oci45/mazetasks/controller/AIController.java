package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.service.OpenAIService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final OpenAIService service;

    public AIController(OpenAIService service) {
        this.service = service;
    }

    @PostMapping("/sugerencia")
public String sugerencia(@RequestBody Map<String, String> body) {
    return service.generarSugerencia(
            body.get("titulo"),
            body.get("descripcion")
    );
}
}