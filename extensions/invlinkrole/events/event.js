const fs = require("fs").promises;
const path = require('path');
const data = require('../configs/data.json');

module.exports = {
  setup(client) {
    client.on("guildMemberAdd", async (member) => {
        console.log(`User ${member.user.tag} joined guild ${member.guild.name}`);
        const code = member.guild.invites.cache.find(
          (invite) => invite.uses === 0
        ).code;
        console.log(code);
        if (data.invites.includes(code)) {
          await member.roles.add(data.role);
        }
    });
  },
};