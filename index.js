const Discord = require(`discord.js`);
const client = new Discord.Client();
const fs = require('fs');

client.on('ready', () =>{
    console.log('TH Bot is Online!')
    function setStatus () {

        client.user.setPresence({
            status: "idle",
            activity: {
                name: `tickets`,
                type: 'WATCHING',
            }
        });

    };
    setStatus();
    setInterval(() => setStatus(), 3600000);    
})

const prefix = '+'

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.login(processes.ENV.DISCORD_TOKEN)
