const ytdl = require('ytdl-core');
const states = require('../util/states');

module.exports = {
    name: 'play',
    description: 'Busca o texto no youtube e toca no canal de voz.',
    async execute(message, args) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('Você não está em um canal de voz.');

        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            title: songInfo.title,
            url: songInfo.video_url
        };

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };
        states.musicQueue.set(message.guild.id, queueConstruct);
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

function play(guild, song) {
    const serverQueue = states.musicQueue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        states.musicQueue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => {
            console.error(error);
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

}