package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.dto.BusquedaSemanticaDTO;
import com.oci45.mazetasks.dto.TareaSimilarDTO;
import com.oci45.mazetasks.service.TareaEmbeddingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas/ia")
public class TareaIAController {

    private final TareaEmbeddingService tareaEmbeddingService;

    public TareaIAController(TareaEmbeddingService tareaEmbeddingService) {
        this.tareaEmbeddingService = tareaEmbeddingService;
    }

    @PostMapping("/buscar-semantico")
    public ResponseEntity<List<TareaSimilarDTO>> buscarSemantico(
            @RequestBody BusquedaSemanticaDTO dto) {

        return ResponseEntity.ok(
                tareaEmbeddingService.buscarSemantico(
                        dto.getTexto(),
                        dto.getLimite()
                )
        );
    }

    @GetMapping("/relacionadas/{tareaId}")
    public ResponseEntity<List<TareaSimilarDTO>> sugerirRelacionadas(
            @PathVariable Long tareaId,
            @RequestParam(required = false) Integer limite) {

        return ResponseEntity.ok(
                tareaEmbeddingService.sugerirRelacionadas(tareaId, limite)
        );
    }
}