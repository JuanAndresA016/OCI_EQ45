package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.model.Tarea;
import com.oci45.mazetasks.service.TareaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    private final TareaService service;

    public TareaController(TareaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Tarea> get(
            @RequestParam Long proyectoId,
            @RequestParam Long creadorId
    ) {
        return service.getByProyecto(proyectoId, creadorId);
    }

    @GetMapping("/{id}")
public ResponseEntity<Tarea> obtenerPorId(@PathVariable Long id) {
    Tarea tarea = service.obtenerPorId(id);
    return ResponseEntity.ok(tarea);
}

    @PostMapping
    public Tarea crear(@RequestBody Tarea tarea) {
        return service.crear(tarea);
    }

    @PutMapping("/{id}")
    public Tarea actualizar(@PathVariable Long id, @RequestBody Tarea tarea) {
        return service.actualizar(id, tarea);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    @GetMapping("/proyectos/{proyectoId}/tareas")
public ResponseEntity<List<Tarea>> obtenerTareas(
        @PathVariable Long proyectoId,
        @RequestParam Long creadorId,
        @RequestParam Long padreId
) {
    List<Tarea> tareas = service.obtenerTareas(proyectoId, creadorId, padreId);
    return ResponseEntity.ok(tareas);
}

@GetMapping("/filtradas")
public ResponseEntity<List<Tarea>> obtenerConPadre(
        @RequestParam Long proyectoId,
        @RequestParam Long personaId,
        @RequestParam Long padreId
) {
    return ResponseEntity.ok(
        service.obtenerTareasConPadre(proyectoId, personaId, padreId)
    );
}

@GetMapping("/padre")
public ResponseEntity<List<Tarea>> obtenerPadres(
        @RequestParam Long proyectoId,
        @RequestParam Long personaId
) {
    return ResponseEntity.ok(
        service.obtenerTareasPadre(proyectoId, personaId)
    );
}
}