package com.oci45.mazetasks.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oci45.mazetasks.dto.CopilotPlanResponseDTO;
import com.oci45.mazetasks.model.Proyecto;
import com.oci45.mazetasks.model.Rol;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAICopilotService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public CopilotPlanResponseDTO generarPlan(
            Proyecto proyecto,
            List<Rol> rolesExistentes,
            String promptUsuario,
            Long tareaPadreId,
            boolean esCreador
    ) {
        try {
            String prompt = construirPrompt(
                    proyecto,
                    rolesExistentes,
                    promptUsuario,
                    tareaPadreId,
                    esCreador
            );

            Map<String, Object> bodyMap = new HashMap<>();
            bodyMap.put("model", "gpt-4.1-mini");
            bodyMap.put("input", prompt);
            bodyMap.put("text", Map.of(
                    "format", Map.of("type", "json_object")
            ));

            String body = mapper.writeValueAsString(bodyMap);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/responses"))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

            System.out.println("OPENAI STATUS: " + response.statusCode());
            System.out.println("OPENAI BODY: " + response.body());

            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new RuntimeException("OpenAI respondió error: " + response.body());
            }

            JsonNode root = mapper.readTree(response.body());

            String jsonText = root
                    .path("output")
                    .get(0)
                    .path("content")
                    .get(0)
                    .path("text")
                    .asText();

            return mapper.readValue(jsonText, CopilotPlanResponseDTO.class);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error generando plan con IA: " + e.getMessage(), e);
        }
    }

    private String construirPrompt(
            Proyecto proyecto,
            List<Rol> rolesExistentes,
            String promptUsuario,
            Long tareaPadreId,
            boolean esCreador
    ) {
        StringBuilder rolesTexto = new StringBuilder();

        for (Rol rol : rolesExistentes) {
            rolesTexto.append("- ").append(rol.getNombre()).append("\n");
        }

        LocalDate hoy = LocalDate.now();

        return """
            Eres un asistente de administración de proyectos para MazeTasks.

            IMPORTANTE:
            Debes responder ÚNICAMENTE con JSON válido.
            No uses markdown.
            No agregues texto fuera del JSON.

            El sistema permite crear:
            - roles del proyecto
            - tareas
            - subtareas infinitas usando padreId internamente
            - asignar roles a tareas

            El sistema NO permite:
            - crear proyectos nuevos
            - asignar roles a personas
            - eliminar personas
            - modificar usuarios

            Contexto del proyecto:
            Nombre: %s
            Descripción: %s

            Roles existentes:
            %s

            Tipo de usuario:
            %s

            Fecha actual:
            %s

            tareaPadreId recibida:
            %s

            Instrucción del usuario:
            %s

            Reglas de planeación:
            - Si el prompt es demasiado ambiguo, establece necesitaMasContexto=true y agrega preguntas.
            - Si hay suficiente contexto, establece necesitaMasContexto=false.
            - Organiza preferentemente por sprints, módulos o roles, según convenga.
            - Puedes crear una jerarquía con subtareas.
            - Si tareaPadreId no es null, genera tareas pensadas como subtareas de esa tarea existente.
            - Si usas roles existentes, escribe rolSugerido exactamente como el nombre del rol.
            - Si el usuario es creador, puedes proponer roles nuevos.
            - Si el usuario es miembro, NO propongas roles nuevos.
            - Las tareas deben iniciar en estado PENDIENTE.
            - tipoMedicion debe ser HORAS.
            - horasTrabajadas debe representar estimación inicial en horas.
            - Decide fechaInicio y fechaFin para cada tarea.
            - Usa formato de fecha YYYY-MM-DD.
            - No pongas fechaFin antes de fechaInicio.
            - Las tareas padre deben cubrir el rango completo de sus subtareas.
            - Las subtareas deben tener fechas realistas según dependencias.
            - Si una tarea depende de otra, pon su fechaInicio después o igual a la fechaFin de la tarea previa.
            - Si el usuario no especifica fechas, empieza desde la fecha actual y distribuye el trabajo de forma realista.
            - No uses fechas pasadas.
            - Las tareas padre también pueden tener rolSugerido si tiene sentido.

            Formato JSON obligatorio:
            {
              "necesitaMasContexto": false,
              "preguntas": [],
              "resumen": "Resumen breve del plan",
              "roles": [
                {
                  "nombre": "Frontend"
                }
              ],
              "tareas": [
                {
                  "titulo": "Sprint 1 - Base del sistema",
                  "descripcion": "Descripción clara",
                  "estado": "PENDIENTE",
                  "tipoMedicion": "HORAS",
                  "horasTrabajadas": 0,
                  "fechaInicio": "%s",
                  "fechaFin": "%s",
                  "rolSugerido": null,
                  "subtareas": [
                    {
                      "titulo": "Frontend",
                      "descripcion": "Espacio de trabajo frontend",
                      "estado": "PENDIENTE",
                      "tipoMedicion": "HORAS",
                      "horasTrabajadas": 0,
                      "fechaInicio": "%s",
                      "fechaFin": "%s",
                      "rolSugerido": "Frontend",
                      "subtareas": []
                    }
                  ]
                }
              ]
            }
            """.formatted(
                proyecto.getNombre(),
                proyecto.getDescripcion(),
                rolesTexto.toString(),
                esCreador ? "CREADOR_ADMIN" : "MIEMBRO_LIMITADO",
                hoy.toString(),
                tareaPadreId == null ? "null" : tareaPadreId.toString(),
                promptUsuario,
                hoy.toString(),
                hoy.plusDays(14).toString(),
                hoy.toString(),
                hoy.plusDays(7).toString()
        );
    }
}