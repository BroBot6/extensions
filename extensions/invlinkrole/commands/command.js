const {} = require("discord.js");
const fs = require("fs");
const data = require("../configs/data.json");

module.exports = {
  setup(client) {
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      if (interaction.commandName === "linkinvite") {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return;

        const role = interaction.options.getRole("role");
        const code = interaction.options.getString("code");

        if (code) {
          const guild = client.guilds.cache.get("935536919520100372");

          const invite = await guild.invites.fetch(code);

          if (invite) {
            data[invite] = role.id;

            await interaction.reply("Invite code linked!");
          }
        } else {
          // create invite and return code

          const invite = await interaction.channel.createInvite({
            maxAge: 0,
            maxUses: 0,
          });

          data[invite["code"]] = role.id;

          await interaction.reply(`Invite code created: ${invite["code"]}`);
        }
        // save data
        fs.writeFileSync(
          `./src/inviteRole/configs/data.json`,
          JSON.stringify(data, null, 2)
        );
      }
    });

    client.on("ready", async () => {
      const commands = [
        {
          name: "linkinvite",
          description: "Link an role to an invite code",
          options: [
            {
              name: "role",
              description: "The role to give",
              type: 8,
              required: true,
            },
            {
              name: "code",
              description: "Link to an existing invite code",
              type: 3,
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
