const TelegramBot = require('node-telegram-bot-api');

const token = "7903265422:AAGJC0BafBBjIdqLTkzV36oKsSpwdXfThQA";

const options = {
    polling: true
};
const birjonBot =  new TelegramBot(token, options);

const prefix = ".";
const seyWelcome = new RegExp(`^${prefix}start$`);
const gempa = new RegExp(`^${prefix}infogempa$`)
const cuaca = new RegExp(`^${prefix}infocuaca$`)
const help = new RegExp(`^${prefix}help$`)

birjonBot.onText(seyWelcome, (callback) => {

    const WelcomeMsg = `Welcome to Birjon Bot 🔴😡🤖 ton, berikut adalah command promt yang bisa dipake!!
    1. Ketik .infogempa untuk mendapatkan info gempa terkini
    2. Ketik .infocuaca untuk mendapatkan info cuaca terkini
    3. Ketik .help untuk mendapatkan informasi penggunaan
    `
    birjonBot.sendMessage(callback.chat.id, WelcomeMsg);
})

birjonBot.onText(help, (callback) => {
    const HelpMsg = `Berikut command yang bisa sipake!!!
    Ketik .start untuk memulai bot
    `
    birjonBot.sendMessage(callback.chat.id, HelpMsg);
});

// GEMPA
birjonBot.onText(gempa, async(callback) => {
    const GAMPA_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"
    const apiCall = await fetch(GAMPA_ENDPOINT + "autogempa.json");
    const {Infogempa: { gempa: { 
        Tanggal, Jam, Magnitude, Kedalaman, Wilayah, Potensi, Shakemap
     } }} = await apiCall.json();
    
    const BMKGImage = GAMPA_ENDPOINT + Shakemap;

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
        birjonBot.sendMessage(callback.chat.id, "Eh bentar wok gempanya error dikit...");
    };  
});

// CUACA
birjonBot.onText(cuaca, async(callback) => {
    const CUACA_ENDPOINT = "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4="
    const apiCall = await fetch(CUACA_ENDPOINT + "51.06.01.2003");
    const responseData = await apiCall.json();
    const {lokasi} = responseData;
    const lokasi_data = responseData.data[0].lokasi;
    const data_Cuaca = responseData.data[0].cuaca[0][0];
    const {datetime, local_datetime, weather_desc, t, hu} = data_Cuaca;
    const {provinsi, kotkab, kecamatan, desa} = lokasi_data;


    const resultCuaca = `  
    "Info Cuaca Terkini nih der"
    Provinsi: ${lokasi.provinsi}
    Kota/Kabupaten: ${lokasi.kotkab}
    Kecamatan: ${lokasi.kecamatan}
    Desa: ${lokasi.desa}
    Waktu: ${datetime} | ${local_datetime}
    Cuaca: ${weather_desc}
    Suhu: ${t}°C
    Kelembapan: ${hu}%

    `;


    try {
        birjonBot.sendMessage(callback.chat.id, resultCuaca);
    }
    catch (error) {
        console.error("Error sending message:", error);
        birjonBot.sendMessage(callback.chat.id, "Eh bentar wok cucacanya error dikit...");
    };
});


