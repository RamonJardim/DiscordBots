const LanguageToolApi = require('language-grammar-api');

module.exports = {
    'moveMemberToChannel':
        async function (serverId, memberId, channelId) {
            const user = await client.fetchUser(memberId);
            const guild = client.guilds.find(guild => guild.id == serverId);
            var member = await guild.fetchMember(user);
            const channel = guild.channels.find(channel => channel.id == channelId);
            member.setVoiceChannel(channel);
        },

    'grammarCheck':
        async function (message) {
            const options = {
                endpoint: 'https://languagetool.org/api/v2'
            };

            const languageToolClient = new LanguageToolApi(options);
            try {
                let check = await languageToolClient.check({
                    text: message,
                    language: 'pt-BR'
                });
                return check;
            } catch (error) {
                throw error;
            }
        },
    'isAdm':
        async function (member) {
            return message.member.roles.find(role => role.hasPermission('ADMINISTRATOR'));
        }
}