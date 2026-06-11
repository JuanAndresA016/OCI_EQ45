package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.dto.CopilotPlanResponseDTO;
import com.oci45.mazetasks.dto.CopilotPromptDTO;
import com.oci45.mazetasks.service.AICopilotService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/copilot/proyecto")
public class AICopilotController {

    private final AICopilotService service;

    public AICopilotController(AICopilotService service) {
        this.service = service;
    }

    @PostMapping("/{proyectoId}/planificar")
    public CopilotPlanResponseDTO planificar(
            @PathVariable Long proyectoId,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody CopilotPromptDTO dto
    ) {
        return service.planificar(proyectoId, authHeader, dto);
    }

    @PostMapping("/{proyectoId}/aplicar")
    public String aplicar(
            @PathVariable Long proyectoId,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody CopilotPlanResponseDTO plan
    ) {
        int creadas = service.aplicarPlan(proyectoId, authHeader, plan);
        return "Plan aplicado correctamente. Tareas creadas: " + creadas;
    }
}