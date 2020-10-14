const router = require('express').Router();
const discordActionService = require('../service/discordActionService');
const constants = require('../util/constants');
const functions = require('../util/functions');

//Expulsa usuário do discord
router.get("/kick/:user", async (req, res, next) => {

    const user = req.params.user;

    functions.moveMemberToChannel(req.client, constants.yeyID, constants[user], constants.theMaciotaID).then((results)=>{
        res.send({success: true, msg:`O ${user} foi expulso com sucesso`})
    }).catch((fail)=>{
        console.log(fail);
        res.statusCode = 500;
        res.send({success: false, msg: ''})
    })

})

router.post("/play", async (req, res, next) => {

    discordActionService.playMusic(req.client,req.body).then((results)=>{
        res.send({success: true, msg: results});
    }).catch((fail)=>{
        console.log(fail);
        res.statusCode = 500;
        res.send({success: false, msg: ''})
    })
    
})

router.post("/stop", async (req, res, next) => {

    discordActionService.stopMusic().then((results)=>{
        res.send({success: true, msg: results});
    }).catch((fail)=>{
        console.log(fail);
        res.statusCode = 500;
        res.send({success: false, msg: ''})
    })
    
})


module.exports = router;