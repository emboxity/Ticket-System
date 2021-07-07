const Discord = require('discord.js');

module.exports = {
    name: 'add',
    description: "adds user to a ticket",
    cooldown: 2,
    guildOnly: true,
    run: async (client, message, args) => {
        if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
        if(!member){
                const error = new Discord.MessageEmbed()
                .setDescription("\<:x_:842221675775787019> The command failed. Did you try to")
                .setColor("#ff6961")
                .setFooter('Ticket System * made by shiba#2254',client.user.displayAvatarURL())
                return message.channel.send(error)
        }
        try {
            message.channel.updateOverwrite(member.user, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                READ_MESSAGE_HISTORY: true,
            }).then(() => {
                message.channel.send(`Successfully added ${member} to ${message.channel}`);
            });
        } catch (error){
            return message.channel.send('An error occured whilst trying to add someone into the ticket.')
        }
    }
}}
