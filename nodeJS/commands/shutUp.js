const states = require('../util/states.js');
const functions = require('../util/functions.js');

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
                    var connection = await victim.voiceChannel.join();
                    if (functions.isAdm(victim)) {
                        victim = message.member;
                    }
                    if (!victim.voiceChannel) return message.reply(`${args} não está em um canal de voz.`);
                    states.kickOnSpeakVictims[victim.id] = true;
                    message.channel.send(`${victim} não pode falar`);
                    connection.on('speaking', (user, speaking) => {
                        if (user.id == victim.id) {
                            victim.setVoiceChannel(null);
                        }
                    });
                }
            });
        }
    }
}