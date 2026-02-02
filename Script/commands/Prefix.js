const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "prefix",
  version: "2.0.0", 
  hasPermssion: 0,
  credits: "BELAL BOTX666",
  description: "Display the bot's prefix with premium videos",
  commandCategory: "Information",
  usages: "prefix",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;
  if (!body) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const dataThread = await Threads.getData(threadID);
  const groupName = dataThread.threadInfo?.threadName || "Unnamed Group";

  // আপনার দেওয়া নতুন নাম ও সিগনেচার
  const adminName = "✡️⃝🅰🅳🅼🅸🅽 ◎⃝😘─͢͢চৃাঁদেৃঁরৃঁ পাৃঁহা্ঁড়ৃঁ✡️⎞🪽";
  const ownerSig = "┄┉❈✡️⋆⃝চাঁদেড়~পাহাড়✿⃝🪬❈┉┄";
  const fbID = "https://www.facebook.com/mahi.gaming.165"; // আপনার আইডি লিঙ্ক
  const phone = "01913246554";

  const triggerWords = [
    "prefix", "mprefix", "mpre", "bot prefix", "what is the prefix", "bot name",
    "how to use bot", "bot not working", "prefx", "prfix", "perfix", "daulenh", "what prefix"
  ];

  let lowerBody = body.toLowerCase();
  if (triggerWords.includes(lowerBody)) {
    
    // আপনার দেওয়া ভিডিও লিস্ট
    const videos = [
      "https://i.imgur.com/qUJvQud.mp4", "https://i.imgur.com/HFudaEm.mp4",
      "https://i.imgur.com/i8nxwCR.mp4", "https://i.imgur.com/zygQoCK.mp4",
      "https://i.imgur.com/qYTXUUb.mp4", "https://i.imgur.com/zqVszYj.mp4",
      "https://i.imgur.com/AmXhkTP.mp4", "https://i.imgur.com/T3yb7jy.mp4",
      "https://i.imgur.com/Bfq83Nl.mp4", "https://i.imgur.com/iWRa1uU.mp4",
      "https://i.imgur.com/YniEZIV.mp4", "https://i.imgur.com/gBrSoBB.mp4",
      "https://i.imgur.com/uetKIMp.mp4", "https://i.imgur.com/2YJexzw.mp4"
    ];

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const videoPath = path.join(__dirname, "cache", "prefix_video.mp4");

    const message = `✨ 💠 ━━━ ◤ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐈𝐍𝐅𝐎 ◢ ━━━ 💠 ✨

  ｢ 🤖 𝗕𝗢𝗧 𝗜𝗡𝗧𝗘𝗟 ｣
◈ 𝗣𝗿𝗲𝗳𝗶𝘅 : [ ${prefix} ]
◈ 𝗡𝗮𝗺𝗲 : BELAL BOT X666 ✡️
◈ 𝗔𝗱𝗺𝗶𝗻 : ${adminName}

  ｢ 🏰 𝗕𝗢𝗫 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 ｣
◈ 𝗚𝗿𝗼𝘂𝗽 : ${groupName}
◈ 𝗧𝗜𝗗 : ${threadID}

  ｢ 👑 𝗢𝗪𝗡𝗘𝗥 𝗟𝗜𝗡𝗞𝗦 ｣
◈ 𝗡𝗮𝗺𝗲 : ${ownerSig}
◈ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : ${fbID}
◈ 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 : ${phone}

━━━━━━━━━━━━━━━━━━━━━━━━
🔱 𝐒𝐢𝐠 : ┄┉❈✡️⋆⃝চাঁদেড়~পাহাড়✿⃝🪬❈┉┄
━━━━━━━━━━━━━━━━━━━━━━━━
『 🛸 𝐒𝐭𝐚𝐲 𝐀𝐡𝐞𝐚𝐝 𝐰𝐢𝐭𝐡 𝐁𝐄𝐋𝐀𝐋 𝐁𝐎𝐓 𝐗𝟔𝟔𝟔 』`;

    try {
      const response = await axios.get(randomVideo, { responseType: "arraybuffer" });
      fs.writeFileSync(videoPath, Buffer.from(response.data, "utf-8"));

      return api.sendMessage({
        body: message,
        attachment: fs.createReadStream(videoPath)
      }, threadID, () => fs.unlinkSync(videoPath), messageID);
    } catch (err) {
      return api.sendMessage(message, threadID, messageID);
    }
  }
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Prefix জানতে 'prefix' লিখে মেসেজ দিন।", event.threadID);
};
       
