module.exports = {
    'moveMemberToChannel':
        async function (serverId, memberId, channelId) {
            const user = await client.fetchUser(memberId);
            const guild = client.guilds.find(guild => guild.id == serverId);
            var member = await guild.fetchMember(user);
            const channel = guild.channels.find(channel => channel.id == channelId);
            member.setVoiceChannel(channel);
        }
}