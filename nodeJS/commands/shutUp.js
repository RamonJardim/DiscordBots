const states = require('../util/states.js');

module.exports = {
    name: 'shutUp',
    description: 'Se o membro marcado falar, ele é desconectado do canal de voz',
    async execute(message, args) {
        if (message.mentions.everyone) message.reply('muito esperto da sua parte...');
        else if (message.mentions.members.size == 0) message.reply(`Quem é ${args}???`);
        else {
            message.mentions.members.forEach(async victim => {

                if (states.kickOnSpeakVictims[victim.id] == true) {
                    if (victim.id != message.author.id) {
                        states.kickOnSpeakVictims[victim.id] = false;
                        message.channel.send(`${args} já pode falar`);
                    }
                    else {
                        message.channel.send(`kkkjjkjkkj`);
                        message.channel.send(`Boa tentativa`);
                    }
                }
                else {

                    if (!functions.isAdm(victim)) {
                        if (!victim.voiceChannel) return message.reply(`${args} não está em um canal de voz.`);
                        states.kickOnSpeakVictims[victim.id] = true;
                        var connection = await victim.voiceChannel.join();

                        message.channel.send(`${args} não pode falar`);
                        await connection.playFile('../util/join.mp3', { passes: 5 });
                        connection.on('speaking', (user, speaking) => {
                            if (user.id == victim.id) {
                                victim.setVoiceChannel(null);
                            }
                        });
                    }
                    else {
                        message.channel.send({ files: ["https://vignette.wikia.nocookie.net/yugioh/images/2/2f/MirrorForce-YS18-EN-C-1E.png/revision/latest?cb=20180712164455"] });
                    
                        message.channel.send(`${message.member} não pode falar`);
                        states.kickOnSpeakVictims[message.member.id] = true;
                    }
                }
            });
        }
    }
}