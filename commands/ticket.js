const Discord = require('discord.js');


module.exports = {
    name: 'ticket',
    description: "lets you make a ticket",
    cooldown: 2,
    guildOnly: true,
    run: async (client, message, args) => {
      if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username}`)) {
        return message.reply('you already have an existing ticket, please close your ticket first before opening a new one!');
      }

      message.guild.channels.create(`ticket-${message.author.username }`, {
        permissionOverwrites: [
           {
               id: message.author.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
             {
              id: message.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
              },
                ],
                type: 'text',

              })
              .then(async channel => {
                try{
                message.author.send(`you have successfully created a ticket! Please click on ${channel} to view your ticket.`);
                } catch(error){
                console.error(error);
                } 
              })
          }}