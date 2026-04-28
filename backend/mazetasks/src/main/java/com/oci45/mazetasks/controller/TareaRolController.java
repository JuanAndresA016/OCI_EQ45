package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.model.TareaRol;
import com.oci45.mazetasks.service.TareaRolService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarea-rol")
public class TareaRolController {

    private final TareaRolService service;

    public TareaRolController(TareaRolService service) {
        this.service = service;
    }

    @GetMapping("/{tareaId}")
    public List<TareaRol> get(@PathVariable Long tareaId) {
        return service.getByTarea(tareaId);
    }

    @PostMapping
    public void asignar(@RequestBody TareaRol tr) {
        service.asignar(tr.getTareaId(), tr.getRolId());
    }

    @DeleteMapping
    public void eliminar(
            @RequestParam Long tareaId,
            @RequestParam Long rolId
    ) {
        service.eliminar(tareaId, rolId);
    }
}