const constants = require('../util/constants');
const functions = require('../util/functions.js')

module.exports = {
	name: 'vsfhirohen',
	description: 'Retira o famigerado ursinho do voice.',
	execute(message, args) {
        functions.moveMemberToChannel(constants.yeyID, constants.kirschID, null)
	}
};