const Discord = require('discord.js');

module.exports = {
    name: 'ticket',
    description: "lets you make a ticket",
    cooldown: 2,
    guildOnly: true,
    run: async (client, message, args) => {
    

      if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
        return message.reply('you already have an existing ticket, please close your ticket first before opening a new one!');
      }

      message.guild.channels.create(`ticket-${message.author.id}`, {
        type: 'text',
        permissionOverwrites: [
           {
               id: message.author.id,
                allow: ['VIEW_CHANNEL'],
            },
             {
              id: message.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
              },


         

                ],
                

              })
              .then(channel => {
                
              
                channel.send(`${message.author} Welcome!`)
                const tEmbed = new Discord.MessageEmbed()
                .setDescription("Please describe your report immediately, as staff will be with you shortly. If you want to close the ticket, please use +delete.")
                channel.send(tEmbed);
                message.author.send(`you have successfully created a ticket! Please click on ${channel} to view your ticket.`);
                
                // bot may get a UnhandledPromiseRejectionWarning, if the user's DM's are off.

                let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                if(logchannel) {
                  const NewTicketEmbed = new Discord.MessageEmbed()
                  .setTitle("New Ticket Created")
                  .addField(`Ticket:`, `<#${channel.id}>, with ticket name ${channel.name}`)
                  .setColor("#000000")
                  .addField(`Created by:`,  `${message.author.tag}`)
                 .setFooter('Ticket System * made by shiba#2254',client.user.displayAvatarURL())
                  return logchannel.send(NewTicketEmbed);
                } else {
                  console.log("No logging channel");
                }
              })
          }}
