const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"));
const userData = require(config.modulesLocation+"/customUserData.js")

module.exports.run = function(bot,conf){
    bot.guilds.forEach(guild=>{
        guild.members.forEach(m=>{
            userData.setUserData(m.user.id,"reputation",0);
        })
    })
}