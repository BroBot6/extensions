const data = require("../../configs/counting/countingData.json");
const { } = require("discord.js");


console.log(data["CurrentCount"]);

module.exports = {
  setup(client) {
    client.on("messageCreate", async (interaction) => {
      if (interaction.author.bot) return;
      
      if (interaction.author.id === data["lastAuthor"]) {
        await interaction.delete();
        return;
      };

      if (interaction.channelId === data["CountingChannel"]) {
        if (interaction.member.roles.cache.some((role) => role.id === data["RequiredRoleID"])) {
          }
          // if message is only a number
          if (interaction.content.match(/^[0-9]+$/)) {
            // if the number is exactly one higher than the current number
            if (Number(interaction.content) === data["CurrentCount"] + 1) {
              // update current count
              data["CurrentCount"] = Number(interaction.content);
              // react with a thumbs up
              data["lastAuthor"] = interaction.author.id;
              await interaction.react(data["reactionEmoji"]);
            } else {
              if (data["CurrentCount"] > data["highestCount"]) {
                data["highestCount"] = data["CurrentCount"];
              }
              data["CurrentCount"] = 0;
              await interaction.reply("wrong number start over");
            }
          } else {
            await interaction.reply("please only send numbers");
          }
        } else {
          // only visible to the user
          await interaction.reply("you are not allowed to play this game");
        }
      }
    );
  },
};
