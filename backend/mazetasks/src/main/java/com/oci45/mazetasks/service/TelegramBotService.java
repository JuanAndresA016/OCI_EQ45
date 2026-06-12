package com.oci45.mazetasks.service;

import com.oci45.mazetasks.model.*;
import com.oci45.mazetasks.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TelegramBotService {

    private final TelegramUsuarioRepository telegramRepo;
    private final PersonaRepository personaRepo;
    private final ProyectoRepository proyectoRepo;
    private final PersonasProyectosRepository personasProyectosRepo;
    private final TareaRepository tareaRepo;
    private final TareaService tareaService;

    public TelegramBotService(
            TelegramUsuarioRepository telegramRepo,
            PersonaRepository personaRepo,
            ProyectoRepository proyectoRepo,
            PersonasProyectosRepository personasProyectosRepo,
            TareaRepository tareaRepo,
            TareaService tareaService
    ) {
        this.telegramRepo = telegramRepo;
        this.personaRepo = personaRepo;
        this.proyectoRepo = proyectoRepo;
        this.personasProyectosRepo = personasProyectosRepo;
        this.tareaRepo = tareaRepo;
        this.tareaService = tareaService;
    }

    public String procesarMensaje(Long chatId, String texto) {
        if (texto == null || texto.isBlank()) {
            return "Comando vacío.";
        }

        if (texto.equals("/start")) {
            return """
                    Bienvenido a MazeTask Bot.

                    Comandos disponibles:

                    /login correo@ejemplo.com
                    /proyectos
                    /tareas proyectoId
                    /crear proyectoId | título | descripción | fechaFin
                    /completar tareaId
                    /help
                    """;
        }

        if (texto.equals("/help")) {
            return """
                    Comandos:

                    /login correo@ejemplo.com
                    Vincula tu Telegram con tu cuenta.

                    /proyectos
                    Lista tus proyectos.

                    /tareas proyectoId
                    Lista tareas visibles de un proyecto.

                    /crear proyectoId | título | descripción | fechaFin
                    Crea una tarea raíz.

                    Ejemplo:
                    /crear 82 | Login responsive | Crear pantalla de login | 2026-06-20

                    /completar tareaId
                    Marca una tarea como completada.
                    """;
        }

        if (texto.startsWith("/login ")) {
            return login(chatId, texto);
        }

        TelegramUsuario telegramUsuario = obtenerVinculacion(chatId);
        if (telegramUsuario == null) {
            return "Primero vincula tu cuenta con: /login tu-correo@ejemplo.com";
        }

        Long personaId = telegramUsuario.getPersonaId();

        if (texto.equals("/proyectos")) {
            return listarProyectos(personaId);
        }

        if (texto.startsWith("/tareas ")) {
            return listarTareas(personaId, texto);
        }

        if (texto.startsWith("/crear ")) {
            return crearTarea(personaId, texto);
        }

        if (texto.startsWith("/completar ")) {
            return completarTarea(personaId, texto);
        }

        return "Comando no reconocido. Usa /help";
    }

    private String login(Long chatId, String texto) {
        String email = texto.replace("/login", "").trim();

        if (email.isBlank()) {
            return "Usa: /login correo@ejemplo.com";
        }

        Persona persona = personaRepo.findByEmail(email)
                .orElse(null);

        if (persona == null) {
            return "No encontré una cuenta con ese correo.";
        }

        TelegramUsuario vinculo = new TelegramUsuario();
        vinculo.setTelegramChatId(chatId);
        vinculo.setPersonaId(persona.getId());
        vinculo.setFechaVinculacion(LocalDateTime.now());

        telegramRepo.save(vinculo);

        return "Cuenta vinculada correctamente con: " + persona.getNombre();
    }

    private TelegramUsuario obtenerVinculacion(Long chatId) {
        return telegramRepo.findById(chatId).orElse(null);
    }

    private String listarProyectos(Long personaId) {
        List<Proyecto> creados = proyectoRepo.findAll()
                .stream()
                .filter(p -> p.getCreadorId().equals(personaId))
                .toList();

        List<Proyecto> miembro = proyectoRepo.obtenerProyectosPorPersona(personaId);

        StringBuilder sb = new StringBuilder();
        sb.append("Tus proyectos:\n\n");

        if (creados.isEmpty() && miembro.isEmpty()) {
            return "No tienes proyectos registrados.";
        }

        if (!creados.isEmpty()) {
            sb.append("Como creador:\n");
            for (Proyecto p : creados) {
                sb.append("ID: ").append(p.getId())
                        .append(" | ").append(p.getNombre())
                        .append("\n");
            }
            sb.append("\n");
        }

        if (!miembro.isEmpty()) {
            sb.append("Como miembro:\n");
            for (Proyecto p : miembro) {
                sb.append("ID: ").append(p.getId())
                        .append(" | ").append(p.getNombre())
                        .append("\n");
            }
        }

        return sb.toString();
    }

    private String listarTareas(Long personaId, String texto) {
        try {
            Long proyectoId = Long.parseLong(texto.replace("/tareas", "").trim());

            Proyecto proyecto = proyectoRepo.findById(proyectoId)
                    .orElse(null);

            if (proyecto == null) {
                return "Proyecto no encontrado.";
            }

            boolean esCreador = proyecto.getCreadorId().equals(personaId);
            boolean esMiembro = personasProyectosRepo.existsByPersonaIdAndProyectoId(personaId, proyectoId);

            if (!esCreador && !esMiembro) {
                return "No tienes acceso a este proyecto.";
            }

            List<Tarea> tareas;

            if (esCreador) {
                tareas = tareaRepo.findByProyectoId(proyectoId);
            } else {
                tareas = tareaService.obtenerTareasVisiblesParaPersona(proyectoId, personaId);
            }

            if (tareas.isEmpty()) {
                return "No hay tareas para mostrar.";
            }

            StringBuilder sb = new StringBuilder();
            sb.append("Tareas del proyecto ").append(proyecto.getNombre()).append(":\n\n");

            for (Tarea t : tareas) {
                sb.append("ID: ").append(t.getId()).append("\n")
                        .append("Título: ").append(t.getTitulo()).append("\n")
                        .append("Estado: ").append(t.getEstado()).append("\n")
                        .append("Fecha fin: ").append(t.getFechaFin()).append("\n\n");
            }

            return sb.toString();

        } catch (Exception e) {
            return "Formato incorrecto. Usa: /tareas proyectoId";
        }
    }

    private String crearTarea(Long personaId, String texto) {
        try {
            String contenido = texto.replaceFirst("/crear", "").trim();
            String[] partes = contenido.split("\\|");

            if (partes.length < 4) {
                return """
                        Formato incorrecto.

                        Usa:
                        /crear proyectoId | título | descripción | fechaFin

                        Ejemplo:
                        /crear 82 | Login responsive | Crear pantalla de login | 2026-06-20
                        """;
            }

            Long proyectoId = Long.parseLong(partes[0].trim());
            String titulo = partes[1].trim();
            String descripcion = partes[2].trim();
            LocalDate fechaFin = LocalDate.parse(partes[3].trim());

            Proyecto proyecto = proyectoRepo.findById(proyectoId)
                    .orElse(null);

            if (proyecto == null) {
                return "Proyecto no encontrado.";
            }

            boolean esCreador = proyecto.getCreadorId().equals(personaId);
            boolean esMiembro = personasProyectosRepo.existsByPersonaIdAndProyectoId(personaId, proyectoId);

            if (!esCreador && !esMiembro) {
                return "No tienes acceso a este proyecto.";
            }

            Tarea tarea = new Tarea();
            tarea.setProyectoId(proyectoId);
            tarea.setPadreId(null);
            tarea.setTitulo(titulo);
            tarea.setDescripcion(descripcion);
            tarea.setEstado("PENDIENTE");
            tarea.setTipoMedicion("HORAS");
            tarea.setHorasTrabajadas(0);
            tarea.setFechaInicio(LocalDate.now());
            tarea.setFechaFin(fechaFin);

            Tarea guardada = tareaService.crear(tarea);

            return "Tarea creada correctamente.\nID: " + guardada.getId() + "\nTítulo: " + guardada.getTitulo();

        } catch (Exception e) {
            e.printStackTrace();
            return "No pude crear la tarea. Revisa el formato o la fecha.";
        }
    }

    private String completarTarea(Long personaId, String texto) {
        try {
            Long tareaId = Long.parseLong(texto.replace("/completar", "").trim());

            Tarea tarea = tareaRepo.findById(tareaId)
                    .orElse(null);

            if (tarea == null) {
                return "Tarea no encontrada.";
            }

            Proyecto proyecto = proyectoRepo.findById(tarea.getProyectoId())
                    .orElse(null);

            if (proyecto == null) {
                return "Proyecto no encontrado.";
            }

            boolean esCreador = proyecto.getCreadorId().equals(personaId);
            boolean esMiembro = personasProyectosRepo.existsByPersonaIdAndProyectoId(personaId, proyecto.getId());

            if (!esCreador && !esMiembro) {
                return "No tienes acceso a esta tarea.";
            }

            if (!esCreador) {
                List<Tarea> tareasVisibles = tareaService.obtenerTareasVisiblesParaPersona(
                        proyecto.getId(),
                        personaId
                );

                boolean visible = tareasVisibles.stream()
                        .anyMatch(t -> t.getId().equals(tareaId));

                if (!visible) {
                    return "No puedes modificar esta tarea porque no está asignada a tus roles.";
                }
            }

            tarea.setEstado("COMPLETADA");
            tarea.setFechaFinReal(LocalDate.now());

            tareaService.actualizar(tarea.getId(), tarea);

            return "Tarea marcada como completada: " + tarea.getTitulo();

        } catch (Exception e) {
            return "Formato incorrecto. Usa: /completar tareaId";
        }
    }
}