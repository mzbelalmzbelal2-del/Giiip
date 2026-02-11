const request = require("request");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "ggg",
  version: "6.0.0",
  hasPermssion: 0,
  credits: "BELAL BOTX666",
  description: "সিরিয়াল অনুযায়ী ১টি করে জিআইএফ শো করবে",
  commandCategory: "Entertainment",
  usages: "[tag]",
  cooldowns: 2,
};

module.exports.run = async ({ api, event }) => {
  const { threadID, messageID, mentions } = event;
  const mentionIDs = Object.keys(mentions);

  if (mentionIDs.length == 0) return api.sendMessage("Please mention someone!", threadID, messageID);

  const id = mentionIDs[0];
  const name = mentions[id].replace("@", "");

  // ১. আপনার সব লিংকের লিস্ট (একটিও বাদ দেওয়া হয়নি)
  const links = [
    "https://i.imgur.com/PTNsTtc.gif", "https://i.imgur.com/h6WLdP1.gif", "https://i.imgur.com/BxqWvRH.gif",
    "https://i.imgur.com/DdaSATI.gif", "https://i.imgur.com/rbcvapr.gif", "https://i.imgur.com/rPiiHsJ.gif",
    "https://i.imgur.com/jKMnCKW.gif", "https://i.imgur.com/UoBL9QI.gif", "https://i.imgur.com/uGK2h0P.gif",
    "https://i.imgur.com/EXAih1d.gif", "https://i.imgur.com/XL20qPA.gif", "https://i.imgur.com/5V3236c.gif",
    "https://i.imgur.com/TfR7rd3.gif", "https://i.imgur.com/wG9C15X.gif", "https://i.imgur.com/tveZQNH.gif",
    "https://i.imgur.com/B7DfyrL.gif", "https://i.imgur.com/ocDhznK.gif", "https://i.imgur.com/iS8ZK1a.gif",
    "https://i.imgur.com/rQliXS3.gif", "https://i.imgur.com/tIqHEuG.gif", "https://i.imgur.com/ll09FGw.gif",
    "https://i.imgur.com/d0BJaim.gif", "https://i.imgur.com/dw8jMd2.gif", "https://i.imgur.com/A5mmnyN.gif",
    "https://i.imgur.com/ncD5dNy.gif", "https://i.imgur.com/WC5m383.gif", "https://i.imgur.com/mSkZa3g.gif",
    "https://i.imgur.com/4qYYuQp.gif", "https://i.imgur.com/MD6df0X.gif", "https://i.imgur.com/zDohVhx.gif",
    "https://i.imgur.com/eTQIzRs.gif", "https://i.imgur.com/0nI3sK7.gif", "https://i.imgur.com/TzbuYIR.gif",
    "https://i.imgur.com/7acsRfW.gif", "https://i.imgur.com/1CsKok6.gif", "https://i.imgur.com/5ReF09J.gif",
    "https://i.imgur.com/F8WsPts.gif", "https://i.imgur.com/gUS1Cbg.gif", "https://i.imgur.com/ftmTqJB.gif",
    "https://i.imgur.com/fn8CQAe.gif", "https://i.imgur.com/ZsXF4vf.gif", "https://i.imgur.com/45dGViB.gif",
    "https://i.imgur.com/SVY0FDB.gif", "https://i.imgur.com/YZObyuL.gif", "https://i.imgur.com/5iQ6HkL.gif",
    "https://i.imgur.com/J1W0lkF.gif", "https://i.imgur.com/LViP5aN.gif", "https://i.imgur.com/TENXjQF.gif",
    "https://i.imgur.com/MbJyn5P.gif", "https://i.imgur.com/fvNDNzO.gif", "https://i.imgur.com/sKP4RZx.gif",
    "https://i.imgur.com/LDFA29c.gif", "https://i.imgur.com/XiDpZlO.gif", "https://i.imgur.com/kYbTseZ.gif",
    "https://i.imgur.com/SCqkiIc.gif", "https://i.imgur.com/AvFr9B0.gif", "https://i.imgur.com/nvuU6kh.gif",
    "https://i.imgur.com/ydknH3i.gif", "https://i.imgur.com/icDjmrb.gif", "https://i.imgur.com/qcYfed8.gif",
    "https://i.imgur.com/RnwNODB.gif", "https://i.imgur.com/ChvSC3J.gif", "https://i.imgur.com/DKESFBE.gif",
    "https://i.imgur.com/URVtrni.gif", "https://i.imgur.com/ukfshOE.gif", "https://i.imgur.com/sNoXtNR.gif",
    "https://i.imgur.com/XWcSgYi.gif", "https://i.imgur.com/T4u5HmP.gif", "https://i.imgur.com/RBekhC9.gif",
    "https://i.imgur.com/mMAioPE.gif", "https://i.imgur.com/0z6hjcU.gif", "https://i.imgur.com/tqpqAGI.gif",
    "https://i.imgur.com/DWA1yUI.gif", "https://i.imgur.com/CIhZC0a.gif", "https://i.imgur.com/DKDWhe2.gif",
    "https://i.imgur.com/NWZgJNi.gif", "https://i.imgur.com/5zBpkuq.gif", "https://i.imgur.com/xCC2gQq.gif",
    "https://i.imgur.com/tXPzV7T.gif", "https://i.imgur.com/lKngtUz.gif", "https://i.imgur.com/v3UrzMl.gif",
    "https://i.imgur.com/uu43A1a.gif", "https://i.imgur.com/w6qyR69.gif", "https://i.imgur.com/dmsYAe2.gif",
    "https://i.imgur.com/x7xXibM.gif", "https://i.imgur.com/85qk30z.gif", "https://i.imgur.com/HkfVUTp.gif",
    "https://i.imgur.com/7vmBvZM.gif", "https://i.imgur.com/9wcRG8I.gif", "https://i.imgur.com/y9ciD7E.gif",
    "https://i.imgur.com/GuTsMHl.gif", "https://i.imgur.com/nUeISTl.gif", "https://i.imgur.com/07Mjg4y.gif",
    "https://i.imgur.com/LgJPXNh.gif", "https://i.imgur.com/bMQJXfo.gif", "https://i.imgur.com/7vBIPPk.gif",
    "https://i.imgur.com/kfAxeJO.gif", "https://i.imgur.com/3IISlED.gif", "https://i.imgur.com/1QRqCYL.gif",
    "https://i.imgur.com/uJVDAox.gif", "https://i.imgur.com/BVQryrr.gif", "https://i.imgur.com/Xz1VTHr.gif",
    "https://i.imgur.com/CxuAu1J.gif", "https://i.imgur.com/0kKbnkz.gif", "https://i.imgur.com/ugXlTv6.gif",
    "https://i.imgur.com/yYKPAg9.gif", "https://i.imgur.com/yT4kLMG.gif", "https://i.imgur.com/BQXP2ZH.gif",
    "https://i.imgur.com/faUpCtq.gif", "https://i.imgur.com/pqr9lax.gif", "https://i.imgur.com/poNF5YM.gif",
    "https://i.imgur.com/D5xGxrC.gif", "https://i.imgur.com/ZJ0gVC1.gif", "https://i.imgur.com/tOUzYGU.gif",
    "https://i.imgur.com/qr9Om6K.gif"
  ];

  // ২. সিরিয়াল মেইনটেইন করার জন্য সেভ ফাইল চেক
  const savePath = path.join(__dirname, "cache", "ggg_serial.json");
  if (!fs.existsSync(savePath)) fs.writeJsonSync(savePath, { nextIndex: 0 });

  let storage = fs.readJsonSync(savePath);
  let currentIndex = storage.nextIndex;

  // ৩. বর্তমান সিরিয়ালের লিংকটি নেওয়া
  const currentLink = links[currentIndex];

  // ৪. পরের বারের জন্য সিরিয়াল ১ বাড়িয়ে সেভ করা
  storage.nextIndex = (currentIndex + 1) % links.length;
  fs.writeJsonSync(savePath, storage);

  const cachePath = path.join(__dirname, "cache", "slap_serial.gif");

  const callback = () => api.sendMessage({
    body: `--- Action Stream ---\n\n🖕🖕 ${name}\n\nএই দেখো 😎 তোমাকে আমি এইভাবে খেলব চুনা 🥵 🤏\n\n-------------------\n[ Serial No: ${currentIndex + 1}/${links.length} ]`,
    mentions: [{ tag: name, id: id }],
    attachment: fs.createReadStream(cachePath)
  }, threadID, () => {
    if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
  }, messageID);

  return request(encodeURI(currentLink)).pipe(fs.createWriteStream(cachePath)).on("close", callback);
};
    
