const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
 name: "helpall",
 version: "4.0.0",
 hasPermssion: 0,
 credits: "Belal YT",
 description: "চোখ ধাঁধানো প্রিমিয়াম মাস্টার কমান্ড লিস্ট",
 commandCategory: "system",
 usages: "[No args]",
 cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
 const { commands } = global.client;
 const { threadID, messageID } = event;

 // ক্যাটাগরি অনুযায়ী সাজানো
 const categories = {};
 for (let [name, value] of commands) {
    const category = value.config.commandCategory || "General";
    if (!categories[category]) categories[category] = [];
    categories[category].push(name);
 }

 const sig = "┄┉❈✡️⋆⃝চাঁদেড়~পাহাড়✿⃝🪬❈┉┄";
 
 // মেইন ডিজাইন শুরু
 let finalText = `✨ ━━━ 🛸 𝐁𝐄𝐋𝐀𝐋 𝐁𝐎𝐓 𝐗𝟔𝟔𝟔 🛸 ━━━ ✨\n\n`;

 for (const category in categories) {
    finalText += `⚡──『 ${category.toUpperCase()} 』──⚡\n`;
    // কমান্ডগুলোকে বুলেট পয়েন্ট দিয়ে সাজানো
    const cmdList = categories[category].map(cmd => `  🔹 ${cmd}`).join("\n");
    finalText += `${cmdList}\n\n`;
 }

 finalText += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
 finalText += `👤 𝐎𝐰𝐧𝐞𝐫: ${sig}\n`;
 finalText += `📊 𝐓𝐨𝐭𝐚𝐥 𝐒𝐤𝐢𝐥𝐥𝐬: ${commands.size} Units\n`;
 finalText += `🛡️ 𝐒𝐭𝐚𝐭𝐮𝐬: Active & Secure\n`;
 finalText += `━━━━━━━━━━━━━━━━━━━━━━━`;

 // আপনার স্পেশাল ইমেজ লিঙ্ক
 const backgrounds = [
 "https://i.imgur.com/6b6DGcW.jpeg",
 "https://i.imgur.com/FQQq8WH.jpeg"
 ];
 
 const selectedBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
 const imgPath = __dirname + "/cache/helpallbg.jpg";

 const callback = () =>
 api.sendMessage({ 
    body: finalText, 
    attachment: fs.createReadStream(imgPath) 
 }, threadID, () => {
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
 }, messageID);

 request(encodeURI(selectedBg))
 .pipe(fs.createWriteStream(imgPath))
 .on("close", () => callback());
};
  
