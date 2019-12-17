
const twisted = require("twisted");


const api = new twisted.LolApi();

module.exports = {
    name: 'lolLastMatch',
    description: 'Retorna o último champion utilizado.',
    async execute(message, args) {
        const { region } = 'BR1';//twisted.Constants.regions.BRAZIL;

        const user = await api.Summoner.getByName(args[0], "BR1")
        const {
            response: {
                matches
            }
        } = await api.Match.list(user.response.accountId, "BR1")
        const matchTimeline = await api.Match.list(user.response.accountId, "BR1")
        const lastMatch = matchTimeline.response.matches[0];
        
        const champion = await api.DataDragon.getChampion(lastMatch.champion);

        message.reply(`${args[0]} estava jogando de ${champion.name}`);
    }
}