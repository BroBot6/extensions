const fs = require("fs").promises;
const path = require('path');

module.exports = {
  setup(client) {
    client.on("guildMemberAdd", async (member) => {
        console.log(`User ${member.user.tag} joined guild ${member.guild.name}`);
        
        try {
          // Asynchron Einladungen abrufen
          await member.guild.fetchInvites().then(invites => {
            const code = invites.find(invite => invite.uses === 0)?.code;
            console.log(code);
            
            if (code !== undefined && data.invites.includes(code)) {
              member.roles.add(data.role);
            }
          });
        } catch (error) {
          console.error("Fehler beim Abrufen der Einladungen:", error);
        }
    });
  },
};
