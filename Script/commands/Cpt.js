const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const request = require('request');
const os = require('os');

module.exports.config = {
    name: "/",
    version: "6.0.0",
    hasPermssion: 0,
    credits: "BELAL BOTX666",
    description: "অ্যাডভান্সড পারফরম্যান্স এবং টাইম-বেসড গ্রিটিং ইনক্লুডেড",
    commandCategory: "Info",
    usages: "/",
    cooldowns: 3
};

module.exports.run = async function({ api, event }) {
    const threadID = event.threadID;
    
    // ১. লাইভ পারফরম্যান্স ক্যালকুলেশন
    const uptime = process.uptime();
    const hours = Math.floor(uptime / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const ping = Date.now() - event.timestamp;

    // ২. স্মার্ট টাইম-বেসড গ্রিটিং
    const hour = new Date().getHours();
    let timeGreeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

    // ৩. রাজকীয় ডিজাইন টেক্সট
    const messageBody = `🌸 𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮𝐚𝐥𝐚𝐢𝐤𝐮𝐦 🌸
${timeGreeting}! আশা করি আমাদের এই পাওয়ারফুল এআই বটটি ব্যবহার করে আপনি সেরা অভিজ্ঞতা পাবেন। 🚀

✨ 💠 ━━━ ◤ 𝐁𝐄𝐋𝐀𝐋 𝐁𝐎𝐓 ◢ ━━━ 💠 ✨
   
   ｢ 🛰️ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗗𝗜𝗔𝗚𝗡𝗢𝗦𝗧𝗜𝗖𝗦 🛰️ ｣

◈ 𝐒𝐭𝐚𝐭𝐮𝐬 : 𝐎𝐍𝐋𝐈𝐍𝐄 [🟢]
◈ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${hours}h ${minutes}m Active
◈ 𝐑𝐀𝐌 𝐔𝐬𝐞 : ${ram} MB
◈ 𝐋𝐚𝐭𝐞𝐧𝐜𝐲 : ${ping}ms (Fast)

   ｢ 🪬 𝗖𝗢𝗥𝗘 𝗜𝗡𝗧𝗘𝗟𝗟𝗜𝗚𝗘𝗡𝗖𝗘 🪬 ｣

◈ 𝐍𝐚𝐦𝐞 : BELAL BOT X666 ✡️
◈ 𝐌𝐨𝐝𝐞𝐥 : V6-ULTRA NEURAL
◈ 𝐀𝐝𝐦𝐢𝐧 : চাঁদের পাহাড় ✡️
◈ 𝐎𝐰𝐧𝐞𝐫 : Belal YT [🛡️]

   ｢ 🔗 𝗘𝗫𝗖𝗟𝗨𝗦𝗜𝗩𝗘 𝗔𝗖𝗖𝗘𝗦𝗦 ｣

📩 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 : m.me/mahi.gaming.165
📡 𝐒𝐢𝐠𝐧𝐚𝐥 : Type /help to Access

━━━━━━━━━━━━━━━━━━━━━━━━
🔱 𝐎𝐰𝐧𝐞𝐫 𝐒𝐢𝐠 : ┄┉❈✡️⋆⃝চাঁদেড়~পাহাড়✿⃝🪬❈┉┄
━━━━━━━━━━━━━━━━━━━━━━━━
『 🛸 𝐒𝐭𝐚𝐲 𝐀𝐡𝐞𝐚𝐝 𝐰𝐢𝐭𝐡 𝐁𝐄𝐋𝐀𝐋 𝐁𝐎𝐓 𝐗𝟔𝟔𝟔 』`;

    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
    const filePath = path.join(cacheDir, 'slash_ultra.jpg');

    const images = [
        'https://i.imgur.com/IZZa8RL.jpeg', 'https://i.imgur.com/eTxOTwc.jpeg',
        'https://i.imgur.com/qSjYag6.jpeg', 'https://i.imgur.com/vpPt78y.jpeg',
        'https://i.imgur.com/CRPz9BU.jpeg', 'https://i.imgur.com/CNJi9p7.jpeg'
    ];

    const imageUrl = images[Math.floor(Math.random() * images.length)];

    const callback = () => {
        api.sendMessage({
            body: messageBody,
            attachment: fs.createReadStream(filePath)
        }, threadID, () => {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
    };

    request(encodeURI(imageUrl))
        .pipe(fs.createWriteStream(filePath))
        .on('close', () => callback());
};
                
