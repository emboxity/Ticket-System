const Discord = require('discord.js');
const pfp = 'https://i.imgur.com/zEcnBhv.png';
module.exports = {
    name: 'about',
    description: 'Gives information about the bot.',
    cooldown: 1.5,
    guildOnly: true,
    run: async(client, message, args) =>{

        const target = message.mentions.members.first()

        if(target || args[0]){
            const ErrorLOL = new Discord.MessageEmbed()
            .setDescription("\<:x_:842221675775787019> The command failed")
            .setColor("#ff6961")
            setFooter('Trade Hangout * made by Squshu',client.user.displayAvatarURL())
            return message.channel.send(ErrorLOL)
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor('Trade Hangout', pfp)
        .setDescription('The bot is coded in JavaScript.')

        .addFields(
            { name: 'Creator', value: 'Squshu' },
            { name: 'Member Count', value: `${client.guilds.cache.size}`},
        )
        .addField('Github', 'https://github.com/emboxity/embox-bot')
        .addField('Source Code', 'https://github.com/emboxity/Trade-Hangout', true)
        .setFooter('Trade Hangout * made by Squshu',client.user.displayAvatarURL())

        message.channel.send(embed)



        
        }}
