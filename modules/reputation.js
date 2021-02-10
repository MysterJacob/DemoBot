const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"));
const userData = require("."+config.modulesLocation+"/customUserData.js")

module.exports.run = function(bot,conf){
    setInterval(()=>{
        fs.readdir("./userData/",(err,files)=>{
            files.forEach((file)=>{
                const userID = files.splice(".")[0]
                let rep = userData.getUserData(userID)["reputation"] || 0
                rep -= rep/15
                userData.setUserData(userData,"reputation",rep);
            })
        })
    },1000*60*60*24)
}