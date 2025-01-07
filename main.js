const TelegramBot = require('node-telegram-bot-api');

const token = "7903265422:AAGJC0BafBBjIdqLTkzV36oKsSpwdXfThQA";

const options = {
    polling: true
};
const birjonBot =  new TelegramBot(token, options);

const prefix = ".";
const seyWelcome = new RegExp(`^${prefix}start$`);
const gempa = new RegExp(`^${prefix}infogempa$`)
const help = new RegExp(`^${prefix}help$`)

birjonBot.onText(seyWelcome, (callback) => {

    const WelcomeMsg = `Welcome to Birjon Bot 🔴😡🤖 berikut adalah command promt yang bisa dipake!!
    1. Ketik .infogempa untuk mendapatkan info gempa terkini
    2. Ketik .help untuk mendapatkan informasi penggunaan
    `
    birjonBot.sendMessage(callback.chat.id, WelcomeMsg);
})

birjonBot.onText(help, (callback) => {
    const HelpMsg = `Berikut command yang bisa sipake!!!
    1. Ketik .start untuk memulai bot
    `
    birjonBot.sendMessage(callback.chat.id, HelpMsg);
});


birjonBot.onText(gempa, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"
    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json");
    const {Infogempa: { gempa: { 
        Tanggal, Jam, Magnitude, Kedalaman, Wilayah, Potensi, Shakemap
     } }} = await apiCall.json();
    
    const BMKGImage = BMKG_ENDPOINT + Shakemap;

    // console.log("BMKGImage URL:", BMKGImage);

    const resultGempa = `
    "Info Gempa Terkini"
    Waktu: ${Tanggal} | ${Jam}
    Besaran: ${Magnitude} SR
    Kedalaman: ${Kedalaman}
    Wilayah: ${Wilayah}
    Potensi: ${Potensi}`;

    try {
        birjonBot.sendMessage(callback.chat.id, resultGempa);
    } catch (error) {
        console.error("Error sending message:", error);
        birjonBot.sendMessage(callback.chat.id, "Eh bentar wok error dikit...");
    };

    
    

    // INIMASIH ERROR JUGA SAMA NAMPILIN IMAGE
    // try {
    //     await birjonbot.sendPhoto(callback.chat.id, BMKGImage, {
    //         caption: resultGempa
    //     });

    //     console.log("Gambar berhasil dikirim!");
    // } catch (error) {
    //     console.error("Error sending photo:", error.response?.body || error);
    //     birjonbot.sendMessage(callback.chat.id, "Terjadi masalah saat mengirim gambar. Mohon coba lagi.");
    // }

    // INI MASIH ERROR NAMPILIN IMG
    // birjonbot.sendPhoto(callback.chat.id, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw0FISD3I9c6gwFli9GcIwW4&ust=1736295531064000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiitIar4ooDFQAAAAAdAAAAABAE", {
    //     caption: "Tes gambar dengan placeholder"
    // }).catch(error => {
    //     console.error("Error sending placeholder image:", error);
    // });


    
});

