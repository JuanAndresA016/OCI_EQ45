package com.oci45.mazetasks.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public String generarSugerencia(String titulo, String descripcion) {

        try {

            String prompt = "Dame recomendaciones prácticas para empezar esta tarea:\n\n"
                    + "Título: " + titulo + "\n"
                    + "Descripción: " + descripcion;

            // -------------------------
            // REQUEST BODY
            // -------------------------
            Map<String, Object> bodyMap = new HashMap<>();
            bodyMap.put("model", "gpt-4.1-mini");
            bodyMap.put("input", prompt);

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

            // -------------------------
            // PARSE JSON RESPONSE
            // -------------------------
            JsonNode root = mapper.readTree(response.body());

            // 👉 AQUÍ ESTÁ LA RESPUESTA REAL
            String text = root
                    .path("output")
                    .get(0)
                    .path("content")
                    .get(0)
                    .path("text")
                    .asText();

            return text;

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generando sugerencia";
        }
    }
}