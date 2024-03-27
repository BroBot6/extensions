const { } = require("discord.js");

module.exports = {
  setup(client) {
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      if (interaction.commandName === "ping") {


        interaction.reply("pong");
      }
    });

    client.on("ready", async () => {
      const commands = [
        {
          name: "ping",
          description: "responds with pong",
        },
      ];

      const guild = client.guilds.cache.get("935536919520100372");

      for (const command of commands) {
        await guild.commands.create(command);
      }
    });
  },
};
