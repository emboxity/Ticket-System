const Discord = require('discord.js');

module.exports = {
    name: 'remove',
    description: "Removes a user to a ticket",
    cooldown: 25,
    guildOnly: true,
    usage: '+remove (User Mention) or (User ID)',
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        var uID = (!member) ? await message.guild.members.fetch(args[0]) : console.log('No ID detected, so I am looking for a mention.')

        console.log(uID);
        console.log(member);

        if(!member && !uID){
            const error = new Discord.MessageEmbed()
            .setDescription("Invalid user")
            .setColor("#ff6961")
            .setFooter('Ticket System * made by shiba#2254',client.user.displayAvatarURL())
            return message.channel.send(error)
        }

        if(message.channel.name.includes('ticket-') && member && !uID) {
        
         		

        try {
            message.channel.updateOverwrite(member.user, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ATTACH_FILES: false,
                READ_MESSAGE_HISTORY: false,
            }).then(() => {
                message.channel.send(`Successfully removed ${member} from ${message.channel}`);
            });
        } catch (error){
            return message.channel.send('An error occured whilst trying to remove someone out of the ticket.')
        }
    }   else if(message.channel.name.includes('ticket-') && !member && uID) {
        
         		

        try {
            message.channel.updateOverwrite(uID.user, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ATTACH_FILES: false,
                READ_MESSAGE_HISTORY: false,
            }).then(() => {
                message.channel.send(`Successfully removed ${uID} from ${message.channel}`);
            });
        } catch (error){
            return message.channel.send('An error occured whilst trying to remove someone out of the ticket.')
        }
    }  else {
        return;
    } 
    
}}
