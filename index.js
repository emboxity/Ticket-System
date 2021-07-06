const Discord = require(`discord.js`);
const client = new Discord.Client();
client.cooldowns = new Discord.Collection();



globalThis.queries = []

const fs = require('fs');





const prefix = '+'


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}





client.on('ready', () =>{
    console.log('Ticket System is Online!')
    function setStatus () {

        client.user.setPresence({
           

            status: "idle",
            activity: {
                name: `${client.users.cache.size} members!`,
                type: 'WATCHING',
            }
        });

    };

    setStatus();
    setInterval(() => setStatus(), 3600000);    


   
        



client.on('message', message => {

    

    
    
    


    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();



    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    const { cooldowns } = client;
    
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }



        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        
    try{
        command.run(message.client, message, args);
    } catch (error){
        console.error(error);
        console.log(price)
        message.reply('There was an error trying to execute this command')
    } 

    

    
    if (message.author.bot || !message.guild) return;
    console.log('1');
    if (!message.content.startsWith(prefix)) return;
    console.log('2');
    const args2 = message.content.slice(prefix.length).split(" ");
    
            



});

})

client.login(processes.ENV.DISCORD_TOKEN)
