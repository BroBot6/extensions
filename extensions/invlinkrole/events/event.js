const fs = require("fs").promises;
const path = require('path');
const data = require('../configs/data.json');

module.exports = {
  setup(client) {

    // Define the bot behavior when a user joins a guild
    client.on("guildMemberAdd", async (member) => {
        console.log(`User ${member.user.tag} joined guild ${member.guild.name}`);
        // get invite code from the invite the user joined with
        const code = member.guild.invites.cache.find(
          (invite) => invite.uses === 0
        ).code;
        console.log(code);
        // if code is in data file add the role to the user by id
        if (data.invites.includes(code)) {
          await member.roles.add(data.role);
        }
      
    });
  },
};