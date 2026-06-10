package com.oci45.mazetasks.service;

import com.oci45.mazetasks.dto.TareaSimilarDTO;
import com.oci45.mazetasks.model.Tarea;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class TareaEmbeddingService {

    private final JdbcTemplate jdbcTemplate;
    private final RestTemplate restTemplate;

    private static final String EMBEDDING_URL = "http://160.34.213.88:8080/embed";
    private static final int VECTOR_DIMENSION = 384;

    public TareaEmbeddingService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.restTemplate = new RestTemplate();
    }

    public void crearOActualizarEmbedding(Tarea tarea) {
        Long tareaId = tarea.getId();

        String titulo = tarea.getTitulo() != null ? tarea.getTitulo() : "";
        String descripcion = tarea.getDescripcion() != null ? tarea.getDescripcion() : "";

        String texto = titulo + ". " + descripcion;
        String vectorTexto = generarVectorComoTexto(texto);

        jdbcTemplate.update("""
            MERGE INTO VALOR_VECTOR_TAREAS v
            USING (
                SELECT ? AS TAREA_ID, TO_VECTOR(?) AS VECTOR_EMBEDDING
                FROM DUAL
            ) src
            ON (v.TAREA_ID = src.TAREA_ID)
            WHEN MATCHED THEN
                UPDATE SET v.VECTOR_EMBEDDING = src.VECTOR_EMBEDDING
            WHEN NOT MATCHED THEN
                INSERT (TAREA_ID, VECTOR_EMBEDDING)
                VALUES (src.TAREA_ID, src.VECTOR_EMBEDDING)
        """, tareaId, vectorTexto);
    }

    public List<TareaSimilarDTO> buscarSemantico(String texto, Integer limite) {
        int limiteFinal = limite != null ? limite : 10;

        String vectorTexto = generarVectorComoTexto(texto);

        return jdbcTemplate.query("""
            SELECT
                t.TAREA_ID,
                t.TITULO,
                t.DESCRIPCION,
                ROUND(
                    (1 - VECTOR_DISTANCE(
                        v.VECTOR_EMBEDDING,
                        TO_VECTOR(?),
                        COSINE
                    )) * 100,
                    2
                ) AS SIMILITUD
            FROM VALOR_VECTOR_TAREAS v
            JOIN TAREAS t
                ON t.TAREA_ID = v.TAREA_ID
            ORDER BY SIMILITUD DESC
            FETCH FIRST ? ROWS ONLY
        """,
        (rs, rowNum) -> new TareaSimilarDTO(
                rs.getLong("TAREA_ID"),
                rs.getString("TITULO"),
                rs.getString("DESCRIPCION"),
                rs.getDouble("SIMILITUD")
        ),
        vectorTexto,
        limiteFinal);
    }

    public List<TareaSimilarDTO> sugerirRelacionadas(Long tareaId, Integer limite) {
        int limiteFinal = limite != null ? limite : 5;

        return jdbcTemplate.query("""
            SELECT
                t.TAREA_ID,
                t.TITULO,
                t.DESCRIPCION,
                ROUND(
                    (1 - VECTOR_DISTANCE(
                        v.VECTOR_EMBEDDING,
                        (
                            SELECT VECTOR_EMBEDDING
                            FROM VALOR_VECTOR_TAREAS
                            WHERE TAREA_ID = ?
                        ),
                        COSINE
                    )) * 100,
                    2
                ) AS SIMILITUD
            FROM VALOR_VECTOR_TAREAS v
            JOIN TAREAS t
                ON t.TAREA_ID = v.TAREA_ID
            WHERE t.TAREA_ID <> ?
            ORDER BY SIMILITUD DESC
            FETCH FIRST ? ROWS ONLY
        """,
        (rs, rowNum) -> new TareaSimilarDTO(
                rs.getLong("TAREA_ID"),
                rs.getString("TITULO"),
                rs.getString("DESCRIPCION"),
                rs.getDouble("SIMILITUD")
        ),
        tareaId,
        tareaId,
        limiteFinal);
    }

    private String generarVectorComoTexto(String texto) {
        Map<String, String> requestBody = Map.of("inputs", texto);

        List<List<Double>> respuesta = restTemplate.postForObject(
                EMBEDDING_URL,
                requestBody,
                List.class
        );

        if (respuesta == null || respuesta.isEmpty()) {
            throw new RuntimeException("El endpoint /embed no regresó ningún vector");
        }

        List<Double> vector = respuesta.get(0);

        if (vector == null || vector.size() != VECTOR_DIMENSION) {
            throw new RuntimeException(
                    "Vector inválido. Tamaño esperado: " + VECTOR_DIMENSION +
                    ", recibido: " + (vector == null ? "null" : vector.size())
            );
        }

        return vector.toString();
    }
}