const router = require('express').Router();
const Discord = require('discord.js');
const constants = require('../util/constants');
const functions = require('../util/functions');

//Expulsa usuário do discord
router.get("/kick", async (req, res, next) => {

    const body = req.body;

    functions.moveMemberToChannel(req.client, constants.yeyID, constants.yuruiID, constants.theMaciotaID).then((results)=>{
        res.send({success: true, msg:"O Yurui foi expulso com sucesso"})
    }).catch((fail)=>{
        console.log(fail);
        res.sendStatus(500);
        res.send({success: false, msg: ""})
    })


})

module.exports = router;