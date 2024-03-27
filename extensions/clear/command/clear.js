const { } = require("discord.js");

module.exports = {
  setup(client) {
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      if (interaction.commandName === "clear") {
        const amount = interaction.options.getChannel("amount");

        message.channel.bulkDelete(100).then(() => {
                message.channel.send(`Deleted ${100} messages.`).then(msg => msg.delete(3000));
          });

        interaction.reply("Temp voice channel created successfully.");
      }
    });

    client.on("ready", async () => {
      const commands = [
        {
          name: "clear",
          description: "Clears the specified amount of messages",
          options: [
            {
              name: "amount",
              description: "The amount of messages to clear",
              type:	4,
              required: false,
            },
          ],
        },
      ];

      const guild = client.guilds.cache.get("935536919520100372");

      for (const command of commands) {
        await guild.commands.create(command);
      }
    });
  },
};
