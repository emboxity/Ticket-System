const Discord = require('discord.js');
const sourcebin = require('sourcebin_js');

module.exports = {
    name: 'transcript',
    description: "lets you create a ticket transcript",
    cooldown: 25,
    guildOnly: true,
    run: async (client, message, args) => {
        var done = false;
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
            if (channel.name === `ticket-${message.author.id}`) {
                channel.messages.fetch().then(async (messages) => {
					const TicketTranscript = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
                    let transcript;
                    transcript = sourcebin.create([
                    {
                        name: '',
                        content: TicketTranscript,
                        languageId: 'text'
                    }
                ], {
                    title: `Chat transcript for ${channel.name}`,
                    description: ' ',
                })
                    .then(transcript => message.reply(`Here is the transcript. ${transcript.url}`))
                    .catch(console.error);
                   
					
                })
               
            
        }	else {
			return;
    
        }   

    
    }
}
