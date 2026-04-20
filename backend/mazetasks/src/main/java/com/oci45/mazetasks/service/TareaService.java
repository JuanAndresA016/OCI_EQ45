package com.oci45.mazetasks.service;


import com.oci45.mazetasks.dto.TareasPorPersonaDTO;
import com.oci45.mazetasks.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    public List<TareasPorPersonaDTO> getTareasPorPersona() {

        List<Object[]> results = tareaRepository.obtenerTareasPorPersona();

        return results.stream()
                .map(obj -> new TareasPorPersonaDTO(
                        (String) obj[0],
                        ((Number) obj[1]).longValue()
                ))
                .collect(Collectors.toList());
    }
} 
