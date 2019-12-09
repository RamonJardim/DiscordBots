const functions = require('../util/functions.js')
const constants = require('../util/constants');
const states = require('../util/states');


module.exports = {
	name: 'vaiPassear',
	description: 'Impede/permite o infeliz de entrar em qualquer canal de voz.',
	execute(message, args) {
        if (message.mentions.everyone) message.reply('muito esperto da sua parte...');
        else if (message.mentions.members.size == 0) message.reply(`Quem é ${args}???`);
        else {
            message.mentions.members.forEach(victm => {
                if (states.strollingMembers[victm.id] == true) {
                    if(victm.id != message.author.id || message.author.id == constants.kirschID){
                        states.strollingMembers[victm.id] = false;
                        message.channel.send(`${args} não está mais passeando`);
                    }
                    else message.channel.send(`kkkjjkjkkj`);
                }
                else if (message.author.id == constants.kirschID) {
                    states.strollingMembers[victm.id] = true;
                    victm.setVoiceChannel(null);
                    message.channel.send(`${args} foi passear`);
                }
                else {
                    message.reply(`Não abuse do ${args}`);
                }
            });
        }
	}
};