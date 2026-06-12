package com.oci45.mazetasks.telegram;

import com.oci45.mazetasks.service.TelegramBotService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

@Component
public class MazeTaskTelegramBot extends TelegramLongPollingBot {

    private final TelegramBotService service;

    @Value("${telegram.bot.username}")
    private String botUsername;

    public MazeTaskTelegramBot(
            @Value("${telegram.bot.token}") String botToken,
            TelegramBotService service
    ) {
        super(botToken);
        this.service = service;
    }

    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (!update.hasMessage() || !update.getMessage().hasText()) {
            return;
        }

        Long chatId = update.getMessage().getChatId();
        String texto = update.getMessage().getText();

        String respuesta = service.procesarMensaje(chatId, texto);

        enviarMensaje(chatId, respuesta);
    }

    private void enviarMensaje(Long chatId, String texto) {
        try {
            SendMessage message = new SendMessage();
            message.setChatId(chatId.toString());
            message.setText(texto);

            execute(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}