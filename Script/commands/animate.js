const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "animate",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Belal x Gemini", // আপনার নাম যুক্ত করা হয়েছে
  description: "টেক্সট অথবা ছবি থেকে AI ভিডিও জেনারেট করুন।",
  commandCategory: "AI",
  usages: "[প্রম্পট অথবা ছবিতে রিপ্লাই দিন]",
  cooldowns: 10,
};

const API_ENDPOINT = "https://metakexbyneokex.fly.dev/animate";
const CACHE_DIR = path.join(__dirname, 'cache');

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, type, messageReply } = event;
  let prompt = args.join(" ").trim();
  let imageUrl = "";

  // মেনশন বা রিপ্লাই সিস্টেম চেক
  if (type === "message_reply") {
    if (messageReply.attachments && messageReply.attachments[0]?.type === "photo") {
      imageUrl = messageReply.attachments[0].url;
    }
  }

  // প্রম্পট চেক (যদি রিপ্লাই না হয় এবং টেক্সটও না থাকে)
  if (!prompt && !imageUrl) {
    return api.sendMessage("দয়া করে একটি প্রম্পট লিখুন অথবা কোনো ছবিতে রিপ্লাই দিয়ে '/animate' লিখুন।\nউদাহরণ: /animate a cat is dancing", threadID, messageID);
  }

  // ক্যাশ ডিরেক্টরি তৈরি
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  api.setMessageReaction("⏳", messageID, () => {}, true);
  let tempFilePath = path.join(CACHE_DIR, `animate_${Date.now()}.mp4`);

  try {
    // API URL তৈরি (ছবি থাকলে ছবিসহ, না থাকলে শুধু প্রম্পট)
    let fullApiUrl = `${API_ENDPOINT}?prompt=${encodeURIComponent(prompt)}`;
    if (imageUrl) {
      fullApiUrl += `&image_url=${encodeURIComponent(imageUrl)}`;
    }
    
    const apiResponse = await axios.get(fullApiUrl, { timeout: 120000 });
    const data = apiResponse.data;

    if (!data.success || !data.video_urls || data.video_urls.length === 0) {
      throw new Error(data.message || "API কোনো ভিডিও দেয়নি।");
    }

    const videoUrl = data.video_urls[0];

    // ভিডিও ডাউনলোড
    const response = await axios({
      method: 'get',
      url: videoUrl,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(tempFilePath);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      api.setMessageReaction("✅", messageID, () => {}, true);
      
      await api.sendMessage({
        body: "আপনার ভিডিও তৈরি হয়েছে! 🎥",
        attachment: fs.createReadStream(tempFilePath)
      }, threadID, () => {
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
          }
      }, messageID);
    });

  } catch (error) {
    api.setMessageReaction("❌", messageID, () => {}, true);
    console.error("Animate Error:", error);
    api.sendMessage("ভিডিও তৈরি করতে ব্যর্থ হয়েছে। সার্ভার ডাউন থাকতে পারে।", threadID, messageID);
    
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
};
                                 
