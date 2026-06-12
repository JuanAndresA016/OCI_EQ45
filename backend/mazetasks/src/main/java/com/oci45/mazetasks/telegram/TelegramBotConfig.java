package com.oci45.mazetasks.telegram;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@Component
public class TelegramBotConfig {

    private final MazeTaskTelegramBot bot;

    public TelegramBotConfig(MazeTaskTelegramBot bot) {
        this.bot = bot;
    }

    @PostConstruct
    public void init() {
        try {
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(bot);

            System.out.println("Telegram bot inicializado: @" + bot.getBotUsername());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}