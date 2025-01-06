const TelegramBot = require('node-telegram-bot-api');

const token = "7903265422:AAGJC0BafBBjIdqLTkzV36oKsSpwdXfThQA";

const options = {
    polling: true
};
const birjonbot =  new TelegramBot(token, options);

// birjonbot.on("message", (msg) => {
//     const chatId = msg.chat.id;
//     birjonbot.sendMessage(chatId, msg.text);
// });

// init variabel input
const prefix = ".";
const seyWelcome = new RegExp(`^${prefix}start$`);
const gempa = new RegExp(`^${prefix}infogempa$`)

birjonbot.onText(seyWelcome, (callback) => {
    birjonbot.sendMessage(callback.chat.id, "Welcome to Birjon Bot");
})

birjonbot.onText(gempa, (callback) => {
    birjonbot.sendMessage(callback.chat.id, "Ini wok beberapa info gempa terkini!!!");
})



// birjonbot.on("message", (callback) => console.log(callback));

// console.log('birjn_bot is running');