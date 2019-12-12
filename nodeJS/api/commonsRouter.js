const express = require("express");
const router = express.Router();
const fraseCheniana = require("../commands/fraseCheniana");
const bot = require("../discordBot")

router.get("/fraseCheniana/:id", async(req,res,next)=>{
    const cdChannel = req.params.id;

    var chan = bot.first().channels.get(cdChannel);

    chan.send("hi")

})

module.exports = router;