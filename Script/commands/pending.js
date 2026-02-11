const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "pending",
  version: "2.1.0",
  credits: "BELAL BOTX666",
  hasPermssion: 2,
  description: "বটের পেন্ডিং গ্রুপ রিকোয়েস্ট ম্যানেজ করার প্রিমিয়াম কমান্ড",
  commandCategory: "system",
  cooldowns: 5
};

module.exports.languages = {
  "en": {
    "invaildNumber": "❌ %1 কোনো সঠিক নাম্বার নয়।",
    "cancelSuccess": "✅ সফলভাবে %1টি গ্রুপ রিজেক্ট করা হয়েছে!",
    "notiBox1": "🔥 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐁𝐘 𝐁𝐄𝐋𝐀𝐋 🔥\nচ্ঁলে্ঁ এ্ঁসে্ঁছি্ঁ 𝐁𝐄𝐋𝐀𝐋 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 এঁখঁনঁ তোঁমাঁদেঁরঁ সাঁথেঁ আঁড্ডাঁ দিঁবঁ..!😘",
    "notiBox2": `╭•┄┅═══❁🌺❁═══┅┄•╮
     আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ
╰•┄┅═══❁🌺❁═══┅┄•╯

𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐬𝐨 𝐦𝐮𝐜𝐡 𝐟𝐨𝐫 𝐚𝐝𝐝𝐢𝐧𝐠 𝐦𝐞 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩! 🖤🤗
𝐈 𝐰𝐢𝐥𝐥 𝐚𝐥𝐰𝐚𝐲𝐬 𝐬𝐞𝐫𝐯𝐞 𝐲𝐨𝐮 𝐢𝐧𝐬𝐡𝐚𝐀𝐥𝐥า𝐡 🌺❤️

╔══════════════════════╗
   💎 𝐁𝐎𝐓 𝐃𝐄𝐓𝐀𝐈𝐋𝐒 💎
╚══════════════════════╝
🔰 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : \${global.config.BOTNAME}
🔰 𝐏𝐑𝐄𝐅𝐈𝐗 : ｢ \${global.config.PREFIX} ｣
🔰 𝐂𝐌𝐃 𝐒𝐈𝐙𝐄 : \${global.client.commands.size}

╔══════════════════════╗
   👤 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 👤
╚══════════════════════╝
👑 𝐍𝐀𝐌𝐄 : 𝐁𝐄𝐋𝐀𝐋
📞 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 : +8801913246554
🔗 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 : https://www.facebook.com/mahi.gaming.165

❖⋆═══════════════════════⋆❖
      𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 ➢ 𝐁𝐄𝐋𝐀𝐋`,
    "approveSuccess": "✅ সফলভাবে %1টি গ্রুপ অ্যাপ্রুভ করা হয়েছে!",
    "cantGetPendingList": "❌ পেন্ডিং লিস্ট খুঁজে পাওয়া যায়নি!",
    "returnListPending": "📝 𝗣𝗘𝗡𝗗𝗜𝗡𝗚 𝗟𝗜𝗦𝗧\\n\\nঅ্যাপ্রুভালের অপেক্ষায় থাকা মোট গ্রুপ: %1\\n\\n%2\\n\\nঅ্যাপ্রুভ করতে সিরিয়াল নাম্বার (যেমন: 1 2) লিখুন, আর রিজেক্ট করতে 'c' লিখে নাম্বার (যেমন: c1 c2) লিখুন।",
    "returnListClean": "✅ এই মুহূর্তে কোনো পেন্ডিং গ্রুপ নেই।"
  }
};

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
  if (String(event.senderID) !== String(handleReply.author)) return;
  const { body, threadID, messageID } = event;
  let count = 0;

  if ((isNaN(body) && body.toLowerCase().startsWith("c")) || body.toLowerCase().startsWith("cancel")) {
    const indexes = body.match(/\\d+/g) || [];
    for (const num of indexes) {
      const index = parseInt(num);
      if (isNaN(index) || index <= 0 || index > handleReply.pending.length) {
        return api.sendMessage(getText("invaildNumber", num), threadID, messageID);
      }
      try {
        await api.removeUserFromGroup(api.getCurrentUserID(), handleReply.pending[index - 1].threadID);
        count++;
      } catch (e) { console.error(e); }
    }
    return api.sendMessage(getText("cancelSuccess", count), threadID, messageID);
  } 
  else {
    const indexes = body.match(/\\d+/g) || [];
    
    // আপনার প্রিমিয়াম ইমেজের লিংকসমূহ
    const imgURLs = [
      "https://graph.facebook.com/mahi.gaming.165/picture?width=720&height=720&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662",
      "https://i.imgur.com/7iSEVbJ.mp4", // আপনার দেওয়া ১ম ইঙ্গুর লিংক
      "https://i.imgur.com/LPzGxdH.mp4"  // আপনার দেওয়া ২য় ইঙ্গুর লিংক
    ];

    for (const num of indexes) {
      const index = parseInt(num);
      if (isNaN(index) || index <= 0 || index > handleReply.pending.length) {
        return api.sendMessage(getText("invaildNumber", num), threadID, messageID);
      }
      try {
        const groupID = handleReply.pending[index - 1].threadID;
        const attachments = [];

        for (let i = 0; i < imgURLs.length; i++) {
          const ext = imgURLs[i].includes(".mp4") ? ".mp4" : ".jpg";
          const cachePath = path.join(__dirname, "cache", `pending_\${Date.now()}_\${i}\${ext}`);
          const response = await axios.get(imgURLs[i], { responseType: "arraybuffer" });
          fs.writeFileSync(cachePath, Buffer.from(response.data, "binary"));
          attachments.push(fs.createReadStream(cachePath));
        }

        await api.sendMessage(getText("notiBox1"), groupID);
        await api.sendMessage({
          body: getText("notiBox2"),
          attachment: attachments
        }, groupID);
        
        count++;
      } catch (e) { console.error(e); }
    }
    return api.sendMessage(getText("approveSuccess", count), threadID, messageID);
  }
};

module.exports.run = async function({ api, event, getText }) {
  const { threadID, messageID } = event;
  try {
    const [spam, pending] = await Promise.all([
      api.getThreadList(100, null, ["OTHER"]),
      api.getThreadList(100, null, ["PENDING"])
    ]);
    const list = [...(spam || []), ...(pending || [])].filter(group => group.isSubscribed && group.isGroup);
    if (list.length === 0) return api.sendMessage(getText("returnListClean"), threadID, messageID);
    const msg = list.map((group, index) => `\${index + 1}. \${group.name || 'Unnamed Group'} (ID: \${group.threadID})`).join('\\n');
    return api.sendMessage(getText("returnListPending", list.length, msg), threadID, (error, info) => {
        if (!error) {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
          });
        }
      }, messageID);
  } catch (e) { console.error(e); return api.sendMessage(getText("cantGetPendingList"), threadID, messageID); }
};
          
