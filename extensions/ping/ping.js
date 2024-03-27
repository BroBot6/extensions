const { } = require("discord.js");


module.exports = {
  setup(client) {
    client.on("messageCreate", async (message) => {
      if (message.author.bot) return;

      if (message.content.toLowerCase() == "ping") {
        message.reply("Pong!");
      }
    });
  },
};
