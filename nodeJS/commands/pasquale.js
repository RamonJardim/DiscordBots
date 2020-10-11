const functions = require('../util/functions.js');
const states = require('../util/states.js');

module.exports = {
    name: 'pasquale',
    description: 'Ativa/desativa o gentleman mode no servidor',
    execute(client,message, args) {
        states.pasqualeMode = !states.pasqualeMode;
        if(states.pasqualeMode)
            message.channel.send('Gentleman mode on, apenas high IQ.');
        else
            message.channel.send('Hirohen já pode falar de novo.');
    }
}