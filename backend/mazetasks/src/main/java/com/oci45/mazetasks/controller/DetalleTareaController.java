package com.oci45.mazetasks.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oci45.mazetasks.dto.TareaResumenDTO;
import com.oci45.mazetasks.model.DetalleTarea;
import com.oci45.mazetasks.service.DetalleTareaService;

@RestController
@RequestMapping("/api/detalle-tarea")
@CrossOrigin(origins = "*")
public class DetalleTareaController {

    private final DetalleTareaService service;

    public DetalleTareaController(DetalleTareaService service) {
        this.service = service;
    }

    @GetMapping
    public List<DetalleTarea> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public DetalleTarea getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public DetalleTarea create(@RequestBody DetalleTarea tarea) {
        return service.save(tarea);
    }

    @PutMapping("/{id}")
    public DetalleTarea update(@PathVariable Long id, @RequestBody DetalleTarea tarea) {
        tarea.setId(id);
        return service.save(tarea);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }


    @GetMapping("/resumen")
    public List<TareaResumenDTO> getResumen() {
        return service.getResumen();
    }
} 
