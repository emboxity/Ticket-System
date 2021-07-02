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

      if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.tag}`)) {
        return message.reply('you already have an existing ticket, please close your ticket first before opening a new one!');
      }

      message.guild.channels.create(`ticket-${message.author.tag}`, {
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
              // .then((channel) => {
              //   const categoryId = '762077125020614666'
              //   channel.setParent(categoryId)
              // })
              .then(async channel => {
                
                const ticketEmbed = new Discord.MessageEmbed()
                .setDescription("Welcome to your ticket! Is this a Trade Hangout Report or a Discord report? React with 👍 if it is a Trade Hangout Report, and 👎 if it is a Discord report.")
                .setFooter('Trade Hangout * made by Squshu',client.user.displayAvatarURL())
                
                const reactionmessage =  await channel.send(ticketEmbed) 

                try{
                  await reactionmessage.react("👍")
                  await reactionmessage.react("👎")
                }
                catch (err) {
                  message.channel.send("Error sending emojis!");
                  throw err;
                }
                const collector = reactionmessage.createReactionCollector(
                  (reaction, user) => user.id === message.author.id
                );
                collector.on("collect", (reaction, user) => {
                  switch (reaction.emoji.name) {
                    case "👍":
                      async function supportRedirect() {
                        
                        channel.send(`${user} Please make your report here. https://discord.gg/W5Z4wH6y9Z`)
                    }
                    reaction.message.delete()
                    return supportRedirect()
                    
          
                    case "👎":
                      async function noRedirect() {
                      
                      channel.send(`${user} Welcome!`)
                      const tEmbed = new Discord.MessageEmbed()
                      .setDescription("Please describe your report immediately, as staff will be with you shortly. If you want to close the ticket, please use +delete.")
                      channel.send(tEmbed);
                  }
                  reaction.message.delete()
                  return noRedirect();
                
                }

              })
                

                message.author.send(`you have successfully created a ticket! Please click on ${channel} to view your ticket.`);
                
                // bot may get a UnhandledPromiseRejectionWarning, if the user's DM's are off.

                let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
                if(logchannel) {
                  const NewTicketEmbed = new Discord.MessageEmbed()
                  .setTitle("New Ticket Created")
                  .addField(`Ticket:`, `<#${channel.id}>, with ticket name ${channel.name}`)
                  .setColor("#000000")
                  .addField(`Created by:`,  `${message.author.tag}`)
                 .setFooter('Trade Hangout * made by Squshu',client.user.displayAvatarURL())
                  return logchannel.send(NewTicketEmbed);
                } else {
                  console.log("No logging channel");
                }
              })
          }}
