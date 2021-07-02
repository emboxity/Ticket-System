const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: 'ticket',
    description: "lets you make a ticket",
    cooldown: 2,
    guildOnly: true,
    run: async (client, message, args) => {
      
      db.add('times.ticket', 1); 
      const timesUsed = db.get('times.ticket');

      if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username}`)) {
        return message.reply('you already have an existing ticket, please close your ticket first before opening a new one!');
      }

      message.guild.channels.create(`ticket-${timesUsed}`, {
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
                
                message.author.send(`you have successfully created a ticket! Please click on ${channel} to view your ticket.`);
                
                // bot may get a UnhandledPromiseRejectionWarning, if the user's DM's are off.

                let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                if(logchannel) {
                  const NewTicketEmbed = new Discord.MessageEmbed()
                  .setTitle("New Ticket Created")
                  .addField(`Ticket:`, `<#${channel.id}>, with ticket name ${message.channel.name}`)
                  .setColor("#000000")
                  .addField(`Created by:`,  `${message.author.tag}`)
                 .setFooter('Trade Hangout * made by Squshu',client.user.displayAvatarURL())
                  return logchannel.send(NewTicketEmbed);
                } else {
                  console.log("No logging channel");
                }
              })
          }}
