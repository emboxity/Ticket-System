const Discord = require('discord.js');
const sourcebin = require('sourcebin');

module.exports = {
    name: 'transcript',
    description: "lets you create a ticket transcript",
    cooldown: 25,
    guildOnly: true,
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (channel.name === `ticket-${message.author.tag}`) {
                channel.messages.fetch().then(async (messages) => {
					const TicketTranscript = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
                    try{
                    const transcript = await sourcebin.create(
                        [
                            {   
                                name: '',
                                content: TicketTranscript,
                                language: 'text',
                            },
                        ],
                        {
                            title: `Transcript for ${channel.name}`,
                            description: '',
                        },
                    );
                } catch(error){
                    return message.channel.send('An error occurred while trying to fetch the transcript.');
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`[\`Transcript\`](${TicketTranscript.url})`)
					message.channel.send('The transcript has been saved.', embed);
                })
            }
        }	else {
			return;
    
        }   
    }
}
