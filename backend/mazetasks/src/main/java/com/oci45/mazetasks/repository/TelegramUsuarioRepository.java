package com.oci45.mazetasks.repository;

import com.oci45.mazetasks.model.TelegramUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelegramUsuarioRepository extends JpaRepository<TelegramUsuario, Long> {
}