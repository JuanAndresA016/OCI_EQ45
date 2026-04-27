package com.oci45.mazetasks.controller;

import com.oci45.mazetasks.model.Rol;
import com.oci45.mazetasks.service.RolService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @GetMapping("/proyecto/{proyectoId}")
    public List<Rol> obtenerPorProyecto(@PathVariable Long proyectoId) {
        return rolService.obtenerPorProyecto(proyectoId);
    }

    @PostMapping
    public Rol crear(@RequestBody Rol rol) {
        return rolService.crear(rol);
    }

    @PutMapping("/{id}")
    public Rol actualizar(@PathVariable Long id, @RequestBody Rol rol) {
        return rolService.actualizar(id, rol);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        rolService.eliminar(id);
    }
}