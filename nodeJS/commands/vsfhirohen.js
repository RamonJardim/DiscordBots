const constants = require('../util/constants');
const functions = require('../util/functions.js')

module.exports = {
	name: 'vsfhirohen',
	description: 'Manda o famigerado ursinho para a sala de quem é engraçado.',
	execute(client,message, args) {
        functions.moveMemberToChannel(client, constants.yeyID, constants.yuruiID, constants.theMaciotaID);
	}
};