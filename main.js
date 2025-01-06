const TelegramBot = require('node-telegram-bot-api');

const token = "7903265422:AAGJC0BafBBjIdqLTkzV36oKsSpwdXfThQA";

const options = {
    polling: true
};
const birjonbot =  new TelegramBot(token, options);

birjonbot.on("message", (msg) => {
    const chatId = msg.chat.id;
    birjonbot.sendMessage(chatId, "Hello, I am Bijon Bot");
});

// birjonbot.on("message", (callback) => console.log(callback));

// console.log('birjn_bot is running');