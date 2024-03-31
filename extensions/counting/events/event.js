const fs = require("fs").promises;
const { MessageEmbed } = require("discord.js");
const data = require("../configs/data.json");
const settings = require("../configs/settings.json");

module.exports = {
  setup(client) {
    client.on("messageCreate", async (message) => {
      try {
        if (message.author.bot) return;
        
        const { channelId, content, member, author } = message;
        
        if (channelId !== settings.CountingChannel) return;

        if (
          member.roles.cache.some((role) => role.id === settings.RequiredRoleID) ||
          settings.RequiredRoleID === null
        ) {
          if (
            author.id === data.lastAuthor ||
            !member.permissions.has("ADMINISTRATOR")
          ) {
            await message.delete();
            await message.reply({content: "You can't play the game.", ephemeral: true});
            return;
          }

          const contentAsNumber = parseInt(content);

          if (!isNaN(contentAsNumber)) {
            if (contentAsNumber === data.CurrentCount + 1) {
              data.CurrentCount = contentAsNumber;
              data.lastAuthor = author.id;
              await message.react(settings.rightEmoji);
            } else {
              if (data.CurrentCount > data.HighestCount) {
                data.HighestCount = data.CurrentCount;
              }
              
              if (!settings.fallback) {
                await message.react(settings.tryagainEmoji);
                await message.reply({ content: "Wrong number. Please try again.", ephemeral: true });
                return;
              }
              
              data.CurrentCount = 0;
              await message.react(settings.wrongEmoji);
              await message.reply({ content: "Wrong number. Starting over at 1.", ephemeral: true });
            }
          } else {
            await message.reply("Please only send numbers.");
            await message.react(settings.tryagainEmoji);
          }
        } else {
          await message.reply("You are not allowed to play this game.");
          await message.react(settings.tryagainEmoji);
        }
        
        await fs.writeFile("./src/counting/configs/data.json", JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Error counting:", error);
        message.reply(`Error counting: ${error}`);
      }
    });
  },
};
