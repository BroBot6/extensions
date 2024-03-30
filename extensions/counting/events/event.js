const data = require("../configs/data.json");
const { } = require("discord.js");
const fs = require("fs").promises;

const settings = data["settings"]

module.exports = {
  setup(client) {
    client.on("messageCreate", async (interaction) => {
      if (interaction.author.bot) return;
      if (interaction.channelId === settings["CountingChannel"]) { 
        if (
          interaction.member.roles.cache.some(
            (role) => role.id === settings["RequiredRoleID"]
          )
        ) {
          if (
            interaction.author.id === data["lastAuthor"] &&
            !interaction.member.permissions.has("ADMINISTRATOR")
          ) {
            await interaction.delete();
            return;
          }
          if (interaction.content.match(/^[0-9]+$/)) {
            if (Number(interaction.content) === data["CurrentCount"] + 1) {
              data["CurrentCount"] = Number(interaction.content);
              data["lastAuthor"] = interaction.author.id;
              await interaction.react(settings["rightEmoji"]);
            } else {
              if (data["CurrentCount"] > data["HighestCount"]) {
                data["HighestCount"] = data["CurrentCount"];
              } if (!settings["fallback"]) {
                await interaction.react(settings["tryagainEmoji"]);
                interaction.reply({ content: 'wrong number try again', ephemeral: true });
                return;
              }
              data["CurrentCount"] = 0;
              await interaction.react(settings["wrongEmoji"]);
              interaction.reply({ content: 'wrong number start over at 1', ephemeral: true });
            }
          } else {
            await interaction.reply("please only send numbers");
            await interaction.react(settings["tryagainEmoji"]);
          }
        } else {
          await interaction.reply("you are not allowed to play this game");
          await interaction.react(settings["tryagainEmoji"]);
        }
        await fs.writeFile(
          "./src/configs/counting/countingData.json",
          JSON.stringify(data)
        );
      }
    });
  },
};
