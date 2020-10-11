const consts = require('../util/constants');

module.exports = {
    name: 'help',
    description: 'Lista todos os comandos ou os detalhes de um comando específico.',
    execute(client,message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Comandos disponíveis:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nUse \`${consts.prefix}help [comando]\` para informações específicas.`);

            return message.channel.send(data, { split: true }).then(res => { return res });
        }
        else {
            const command = commands.get(args[0]);
            if(command)
                message.channel.send(`${command.name} - ${command.description}`);
            else
                message.reply(`O comando ${args[0]} não existe`);
        }
    }
}