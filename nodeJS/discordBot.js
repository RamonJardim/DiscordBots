const fs = require('fs');
const http = require('http');
const dotenv = require('dotenv');
const Discord = require('discord.js');
const states = require('./util/states');

dotenv.config();

var server_port = process.env.YOUR_PORT || process.env.PORT || 60;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Wushuu online!');
    res.end();
}).listen(server_port, server_host, function () {
    console.log('Listening on port %d', server_port);
});

const client = new Discord.Client();
const APIKey = process.env.DISCORD_BOT_SECRET;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const prefix = ';';
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Connected in ${client.guilds.size} servers:`)
    client.guilds.forEach(guild => {
        console.log(guild.name);
    })

    client.user.setPresence({ game: { name: 'LoL as Zoe' }, status: 'online' })
        .then()
        .catch(console.error);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (states.strollingMembers[newMember.id]) {
        newMember.setVoiceChannel(null);
    }
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        message.channel.send(`Quebrei, culpem o Ramon`);
        console.error(error);
    }

});

client.login(APIKey);