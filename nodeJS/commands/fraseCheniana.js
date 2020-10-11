const lerolero = require('lerolero');

module.exports = {
    name: 'fraseCheniana',
    description: 'Uma possível frase do grande Chen.',
    execute(client,message, args) {
        message.channel.send(`*${lerolero()}*`);
    }
}