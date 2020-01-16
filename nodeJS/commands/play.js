const ytsr = require('ytsr');
const ytdl = require('ytdl-core-discord');
const states = require('../util/states');

module.exports = {
    name: 'play',
    description: 'Busca o texto no youtube e toca no canal de voz.',
    async execute(message, args) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.reply('Você não está em um canal de voz.');
        if (args.length == 0) return message.reply('Tocar o que?');
        const songData = (await ytsr(args.join(' '), { limit: 1 })).items[0];
        const songLink = songData.link;

        const songInfo = await ytdl.getInfo(songLink);
        const song = {
            title: songInfo.title,
            url: songInfo.video_url
        };

        var queueConstruct = states.musicQueue.get(message.guild.id);
        if (queueConstruct && queueConstruct.songs.length > 0) {
            queueConstruct.songs.push(song);
            message.channel.send(`${songData.title} adicionada à fila`);
        }
        else {
            message.channel.send(`Tocando ${songData.title}`);
            message.channel.send(songLink);

            queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };
            states.musicQueue.set(message.guild.id, queueConstruct);
            queueConstruct = states.musicQueue.get(message.guild.id);
            queueConstruct.songs.push(song);


            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (err) {
                console.log(err);
                states.musicQueue.delete(message.guild.id);
                return message.channel.send(err);
            }
        }
    }
}

async function play(guild, song, message) {
    const serverQueue = states.musicQueue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        states.musicQueue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playOpusStream(await ytdl(song.url))
        .on('end', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0], message);
        })
        .on('error', error => {
            console.error(error);
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

}