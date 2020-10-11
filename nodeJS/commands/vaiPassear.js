const functions = require('../util/functions.js')
const states = require('../util/states.js');


module.exports = {
    name: 'vaiPassear',
    description: 'Impede/permite o infeliz de entrar em qualquer canal de voz.',
    async execute(client, message, args) {
        if (message.mentions.everyone) message.reply('muito esperto da sua parte...');
        else if (message.mentions.members.size == 0) message.reply(`Quem é ${args}???`);
        else {
            message.mentions.members.forEach(victm => {
                if (states.strollingMembers[victm.id] == true) {
                    if (victm.id != message.author.id) {
                        states.strollingMembers[victm.id] = false;
                        message.channel.send(`${args} não está mais passeando`);
                    }
                    else {
                        message.channel.send(`kkkjjkjkkj`);
                        message.channel.send(`Boa tentativa`);
                    }
                }
                else
                    if (!functions.isAdm(victm)) {
                        states.strollingMembers[victm.id] = true;
                        victm.setVoiceChannel(null);
                        message.channel.send(`${args} foi passear`);
                    }
                    else {
                        // message.channel.send({files:["https://vignette.wikia.nocookie.net/yugioh/images/2/2f/MirrorForce-YS18-EN-C-1E.png/revision/latest?cb=20180712164455"]});

                        message.channel.send(message.member + ' foi passear');
                        states.strollingMembers[message.member.id] = true;
                        message.member.setVoiceChannel(null);
                    }
            });
        }
    }
};

//|| functions.isAdm(message.member)