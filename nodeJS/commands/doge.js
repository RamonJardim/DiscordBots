const doge = require('dogeify-js');

module.exports = {
    name: 'doge',
    description: 'Transforma seu texto em doge speak.',
    async execute(client, message, args) {
        message.channel.send(await doge(args));
    }
}