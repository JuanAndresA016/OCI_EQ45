package com.oci45.mazetasks.service;

import com.oci45.mazetasks.dto.*;
import com.oci45.mazetasks.model.*;
import com.oci45.mazetasks.repository.*;
import com.oci45.mazetasks.security.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class AICopilotService {

    private final OpenAICopilotService openAICopilotService;
    private final ProyectoRepository proyectoRepository;
    private final PersonaRepository personaRepository;
    private final PersonasProyectosRepository personasProyectosRepository;
    private final PersonaRolRepository personaRolRepository;
    private final RolRepository rolRepository;
    private final TareaService tareaService;
    private final TareaRolService tareaRolService;
    private final JwtUtil jwtUtil;

    public AICopilotService(
            OpenAICopilotService openAICopilotService,
            ProyectoRepository proyectoRepository,
            PersonaRepository personaRepository,
            PersonasProyectosRepository personasProyectosRepository,
            PersonaRolRepository personaRolRepository,
            RolRepository rolRepository,
            TareaService tareaService,
            TareaRolService tareaRolService,
            JwtUtil jwtUtil
    ) {
        this.openAICopilotService = openAICopilotService;
        this.proyectoRepository = proyectoRepository;
        this.personaRepository = personaRepository;
        this.personasProyectosRepository = personasProyectosRepository;
        this.personaRolRepository = personaRolRepository;
        this.rolRepository = rolRepository;
        this.tareaService = tareaService;
        this.tareaRolService = tareaRolService;
        this.jwtUtil = jwtUtil;
    }

    public CopilotPlanResponseDTO planificar(Long proyectoId, String authHeader, CopilotPromptDTO dto) {
        Persona persona = obtenerPersonaDesdeToken(authHeader);
        Proyecto proyecto = obtenerProyecto(proyectoId);

        boolean esCreador = proyecto.getCreadorId().equals(persona.getId());
        boolean esMiembro = personasProyectosRepository.existsByPersonaIdAndProyectoId(
                persona.getId(),
                proyectoId
        );

        if (!esCreador && !esMiembro) {
            throw new RuntimeException("No tienes acceso a este proyecto");
        }

        List<Rol> roles = rolRepository.findByProyectoId(proyectoId);

        CopilotPlanResponseDTO plan = openAICopilotService.generarPlan(
                proyecto,
                roles,
                dto.getPrompt(),
                dto.getTareaPadreId(),
                esCreador
        );

        plan.setTareaPadreId(dto.getTareaPadreId());

        return plan;
    }

    @Transactional
    public int aplicarPlan(Long proyectoId, String authHeader, CopilotPlanResponseDTO plan) {
        Persona persona = obtenerPersonaDesdeToken(authHeader);
        Proyecto proyecto = obtenerProyecto(proyectoId);

        boolean esCreador = proyecto.getCreadorId().equals(persona.getId());
        boolean esMiembro = personasProyectosRepository.existsByPersonaIdAndProyectoId(
                persona.getId(),
                proyectoId
        );

        if (!esCreador && !esMiembro) {
            throw new RuntimeException("No tienes acceso a este proyecto");
        }

        if (!esCreador && plan.getRoles() != null && !plan.getRoles().isEmpty()) {
            throw new RuntimeException("Solo el creador puede crear roles");
        }

        Map<String, Rol> rolesPorNombre = cargarRoles(proyectoId);

        if (esCreador && plan.getRoles() != null) {
            for (CopilotRolPlanDTO rolPlan : plan.getRoles()) {
                if (rolPlan.getNombre() == null || rolPlan.getNombre().isBlank()) {
                    continue;
                }

                String key = normalizar(rolPlan.getNombre());

                if (!rolesPorNombre.containsKey(key)) {
                    Rol rol = new Rol();
                    rol.setNombre(rolPlan.getNombre());
                    rol.setProyectoId(proyectoId);

                    Rol guardado = rolRepository.save(rol);
                    rolesPorNombre.put(key, guardado);
                }
            }
        }

        Long padreInicial = plan.getTareaPadreId();

        int totalCreadas = 0;

        if (plan.getTareas() != null) {
            for (CopilotTareaPlanDTO tareaPlan : plan.getTareas()) {
                totalCreadas += crearTareaRecursiva(
                        proyectoId,
                        padreInicial,
                        tareaPlan,
                        rolesPorNombre,
                        esCreador,
                        persona.getId()
                );
            }
        }

        return totalCreadas;
    }

    private int crearTareaRecursiva(
            Long proyectoId,
            Long padreId,
            CopilotTareaPlanDTO tareaPlan,
            Map<String, Rol> rolesPorNombre,
            boolean esCreador,
            Long personaId
    ) {
        if (tareaPlan.getTitulo() == null || tareaPlan.getTitulo().isBlank()) {
            return 0;
        }

        Rol rolAsignado = null;

        if (tareaPlan.getRolSugerido() != null && !tareaPlan.getRolSugerido().isBlank()) {
            rolAsignado = rolesPorNombre.get(normalizar(tareaPlan.getRolSugerido()));
        }

        if (!esCreador && rolAsignado != null) {
            boolean personaTieneRol = personaRolRepository.existsByPersonaIdAndRolId(
                    personaId,
                    rolAsignado.getId()
            );

            if (!personaTieneRol) {
                throw new RuntimeException("No puedes crear tareas para el rol: " + rolAsignado.getNombre());
            }
        }

        Tarea tarea = new Tarea();
        tarea.setProyectoId(proyectoId);
        tarea.setPadreId(padreId);
        tarea.setTitulo(tareaPlan.getTitulo());
        tarea.setDescripcion(tareaPlan.getDescripcion());
        tarea.setEstado(tareaPlan.getEstado() != null ? tareaPlan.getEstado() : "PENDIENTE");
        tarea.setTipoMedicion(tareaPlan.getTipoMedicion() != null ? tareaPlan.getTipoMedicion() : "HORAS");
        tarea.setHorasTrabajadas(tareaPlan.getHorasTrabajadas() != null ? tareaPlan.getHorasTrabajadas() : 0);
        tarea.setFechaInicio(
        tareaPlan.getFechaInicio() != null
                ? LocalDate.parse(tareaPlan.getFechaInicio())
                : LocalDate.now()
);

tarea.setFechaFin(
        tareaPlan.getFechaFin() != null
                ? LocalDate.parse(tareaPlan.getFechaFin())
                : LocalDate.now().plusDays(7)
);

        Tarea guardada = tareaService.crear(tarea);

        if (rolAsignado != null) {
            tareaRolService.asignar(guardada.getId(), rolAsignado.getId());
        }

        int creadas = 1;

        if (tareaPlan.getSubtareas() != null) {
            for (CopilotTareaPlanDTO subtarea : tareaPlan.getSubtareas()) {
                creadas += crearTareaRecursiva(
                        proyectoId,
                        guardada.getId(),
                        subtarea,
                        rolesPorNombre,
                        esCreador,
                        personaId
                );
            }
        }

        return creadas;
    }

    private Persona obtenerPersonaDesdeToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token no enviado");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extraerEmail(token);

        return personaRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    private Proyecto obtenerProyecto(Long proyectoId) {
        return proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
    }

    private Map<String, Rol> cargarRoles(Long proyectoId) {
        List<Rol> roles = rolRepository.findByProyectoId(proyectoId);
        Map<String, Rol> map = new HashMap<>();

        for (Rol rol : roles) {
            map.put(normalizar(rol.getNombre()), rol);
        }

        return map;
    }

    private String normalizar(String texto) {
        return texto == null ? "" : texto.trim().toLowerCase();
    }
}