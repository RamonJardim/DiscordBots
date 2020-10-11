const router = require('express').Router();
const Discord = require('discord.js');
const constants = require('../util/constants');
const functions = require('../util/functions');

//Expulsa usuário do discord
router.get("/kick/:user", async (req, res, next) => {

    const body = req.body;
    const user = req.params.user;

    functions.moveMemberToChannel(req.client, constants.yeyID, constants[user], constants.theMaciotaID).then((results)=>{
        res.send({success: true, msg:"O Yurui foi expulso com sucesso"})
    }).catch((fail)=>{
        console.log(fail);
        res.sendStatus(500);
        res.send({success: false, msg: ""})
    })


})

module.exports = router;