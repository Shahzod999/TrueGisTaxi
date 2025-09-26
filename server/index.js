require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_TOKEN;

const webAppUrl = process.env.WEB_APP_URL;
const port = process.env.PORT || 3000;

console.log("Web App URL:", webAppUrl);
console.log("Server Port:", port);

const bot = new TelegramBot(token, { polling: true });

const app = express();

// CORS настройки
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Раздача статических файлов из client/dist
const clientDistPath = path.resolve(process.cwd(), "client/dist");
app.use(express.static(clientDistPath));

// API маршруты
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    message: "Server is running", 
    timestamp: new Date().toISOString() 
  });
});

// Health check для Docker
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const timestamp = msg.date; // Unix timestamp

  // Преобразуем Unix timestamp в читаемый формат
  const date = new Date(timestamp * 1000);
  const formattedTime = date.toLocaleString("ru-RU", {
    timeZone: "Asia/Tashkent",
  });
  console.log(`Получено сообщение: ${text} от ${chatId} в ${formattedTime}`);

  if (text == "/start") {
    try {
      await bot.sendMessage(chatId, "круто ниже кнопка на сайт", {
        reply_markup: {
          inline_keyboard: [[{ text: "Перейти на сайт ", web_app: { url: webAppUrl } }]],
        },
      });
    } catch (error) {
      console.log("Ошибка при отправке сообщения:", error.message);
    }
  }
});

// SPA маршрутизация - все неизвестные маршруты отправляем на index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// Запуск сервера
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📱 Telegram Bot is active`);
  console.log(`📁 Static files served from: ${clientDistPath}`);
});
