const ytsr = require('ytsr');
const ytdl = require('ytdl-core-discord');
const states = require('../util/states');
const constants = require('../util/constants');

const playMusic = function (client, playDto) {

    return new Promise(async (resolve, reject) => {

        playDto.songName = "barata dançando";

        const voiceChannel = client.channels.get(constants.magicID);
        const guild = client.guilds.find(guild => guild.id == constants.yeyID);

        if (!voiceChannel) { reject(); return; };
        if (playDto.songName == null) { reject("O nome da música não pode ser vazio"); return; };
        const songData = (await ytsr(playDto.songName, { limit: 1 })).items[0];
        const songLink = songData.link;

        const songInfo = await ytdl.getInfo(songLink);
        const song = {
            title: songInfo.title,
            url: songInfo.video_url
        };

        var queueConstruct = states.musicQueue.get(constants.yeyID);
        if (queueConstruct && queueConstruct.songs.length > 0) {
            queueConstruct.songs.push(song);
            // message.channel.send(`${songData.title} adicionada à fila`);
            resolve(`${songData.title} adicionada a fila`);
        }
        else {
            // message.channel.send(`Tocando ${songData.title}`);
            // message.channel.send(songLink);

            queueConstruct = {
                // textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };
            states.musicQueue.set(constants.yeyID, queueConstruct);
            queueConstruct = states.musicQueue.get(constants.yeyID);
            queueConstruct.songs.push(song);


            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(guild, queueConstruct.songs[0]);
                resolve(songData.title);
            } catch (err) {
                console.log(err);
                states.musicQueue.delete(constants.yeyID);
                reject(err);
                // return message.channel.send(err);
            }
        }

    })

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

module.exports = {
    playMusic: (client, playDto) => {
        return playMusic(client, playDto);
    }
}

