const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"));
const userData = require("."+config.modulesLocation+"/customUserData.js")

module.exports.run = function(bot,conf){
}