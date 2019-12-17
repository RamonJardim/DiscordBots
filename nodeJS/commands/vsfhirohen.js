const constants = require('../util/constants');
const functions = require('../util/functions.js')

module.exports = {
	name: 'vsfhirohen',
	description: 'Manda o famigerado ursinho para a sala de quem é engraçado.',
	execute(message, args) {
        functions.moveMemberToChannel(constants.yeyID, constants.ursinhoID, constants.theMaciotaID);
	}
};