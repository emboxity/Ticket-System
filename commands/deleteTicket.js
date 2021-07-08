const Discord = require('discord.js');
module.exports = {
    name: 'delete',
    description: "Lets you delete a ticket",
    cooldown: 2,
    guildOnly: true,
    usage: '+delete',
    run: async (client, message, args) => {
        if(message.channel.name.includes('ticket-')) {
            function call(){
              let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
              if(logchannel) {
                const NewTicketEmbed = new Discord.MessageEmbed()
                .setTitle("Ticket Deleted")
                .addField(`Ticket:`, `${message.channel.name}`)
                .setColor("#000000")
                .addField(`Created by:`,  `${message.author.tag}`)
                .setFooter('Ticket System * made by shiba#2254',client.user.displayAvatarURL())
                return logchannel.send(NewTicketEmbed);
              } else {
                console.log("No logging channel");
              }
            }
            function del(){
                message.channel.send("Deleting the ticket in 5 seconds!");
                setTimeout(() => {
                    message.channel.delete();
                }, 5000);
            }
           
            del();
            call();
            

             
        
        } 
    }}
