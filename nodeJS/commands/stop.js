const states = require('../util/states');

module.exports = {
    name: 'stop',
    description: 'Para a playlist',
    execute(message, args) {
        const serverQueue = states.musicQueue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('Não tem nada pra parar...');
        serverQueue.connection.dispatcher.end();
    }
}