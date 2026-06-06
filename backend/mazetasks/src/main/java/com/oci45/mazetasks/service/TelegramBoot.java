package com.oci45.mazetasks.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@Service
public class TelegramBoot extends TelegramLongPollingBot {

    @Autowired
    private PersonaService personaService;

    @Value("${telegram.bot.username}")
    private String botUsername;

    @Value("${telegram.bot.token}")
    private String botToken;

    @PostConstruct
    public void init() {
        try {
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(this);
            System.out.println("Telegram bot inicializado: @" + getBotUsername());
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            System.out.println("Mensaje recibido: " + messageText);
            final long chatId = update.getMessage().getChatId();

            if (messageText.contains(" ") && !messageText.startsWith(" ") && !messageText.endsWith(" ")) {
                String[] credentials = messageText.split(" ", 2);
                String user = credentials[0];
                String password = credentials[1];
                login(chatId, user, password);
            } else {
                SendMessage errorMessage = new SendMessage();
                errorMessage.setChatId(chatId);
                errorMessage.setText("Formato incorrecto. Envia tu correo y contraseña separados por un espacio.");
                try {
                    execute(errorMessage);
                } catch (TelegramApiException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public boolean login(long chatId, String user, String password) {
        try {
            personaService.login(user, password);
            showSecret(chatId);
            return true;
        } catch (RuntimeException e) {
            SendMessage message = new SendMessage();
            message.setChatId(chatId);
            message.setText("Credenciales incorrectas: " + e.getMessage());
            try {
                execute(message);
            } catch (TelegramApiException telegramApiException) {
                telegramApiException.printStackTrace();
            }
            return false;
        }
    }

    public void showSecret(long chatId) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId);
        message.setText("Aquí está tu secreto: mi_clave_secreta_super_segura_123456789");
        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public String getBotToken() {
        return botToken;
    }
}