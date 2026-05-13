const axios = require("axios");

module.exports = {
  name: "gemini",
  alias: ["ai"],
  desc: "Gemini AI Chat",
  category: "ai",

  async execute(sock, msg, args) {

    const text = args.join(" ");
    if (!text) {
      return sock.sendMessage(msg.key.remoteJid,
        { text: "❌ Use: .gemini hello" },
        { quoted: msg }
      );
    }

    const API_KEY = "AIzaSyAO4Y3K9ikWFxp7RbAl4UbkhbMgElcQCSY";

    try {

      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [{ text }]
            }
          ]
        }
      );

      const reply = res.data.candidates[0].content.parts[0].text;

      sock.sendMessage(msg.key.remoteJid,
        { text: "🤖 Gemini:\n\n" + reply },
        { quoted: msg }
      );

    } catch (e) {
      sock.sendMessage(msg.key.remoteJid,
        { text: "❌ Error in Gemini API" },
        { quoted: msg }
      );
    }
  }
};
