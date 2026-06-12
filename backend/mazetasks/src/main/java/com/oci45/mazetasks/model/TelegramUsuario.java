package com.oci45.mazetasks.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "TELEGRAM_USUARIOS")
public class TelegramUsuario {

    @Id
    @Column(name = "TELEGRAM_CHAT_ID")
    private Long telegramChatId;

    @Column(name = "PERSONA_ID")
    private Long personaId;

    @Column(name = "FECHA_VINCULACION")
    private LocalDateTime fechaVinculacion;

    public Long getTelegramChatId() {
        return telegramChatId;
    }

    public void setTelegramChatId(Long telegramChatId) {
        this.telegramChatId = telegramChatId;
    }

    public Long getPersonaId() {
        return personaId;
    }

    public void setPersonaId(Long personaId) {
        this.personaId = personaId;
    }

    public LocalDateTime getFechaVinculacion() {
        return fechaVinculacion;
    }

    public void setFechaVinculacion(LocalDateTime fechaVinculacion) {
        this.fechaVinculacion = fechaVinculacion;
    }
}