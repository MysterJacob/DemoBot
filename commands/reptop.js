const { Collection } = require("discord.js");
const fs = require("fs")
const discord = require("discord.js")
const customUserData = require("../modules/customUserData.js");
module.exports.run = function(msg,bot,args){
    const guild = msg.guild
    fs.readdir(bot.config.userDataLocation,(err,files)=>{
        let leaderboard = new Collection()
        files.forEach(file=>{
            const name = file.split(".")[0]
            const userData = customUserData.getUserData(name)
            console.log(userData)
            console.log(name)
            if (userData["reputation"] != undefined){
                leaderboard.set(name,userData["reputation"])
            }
        })
        const embed = new discord.MessageEmbed()
        console.log(leaderboard)
        embed.setTitle("Tabela reputacji")
        embed.setColor("#fcba03")
        let index = 1
        leaderboard.sort()
        leaderboard.keyArray().forEach(userID=>{
            console.log(userID)
            const member =  msg.guild.members.cache.find(m=>m.id == userID)
            const userData = customUserData.getUserData(userID)
            embed.addField(index+". "+member.user.tag,userData["reputation"])
            index+=1
        })
        msg.channel.send(embed)
    });
   
}
module.exports.help = {
    "names":["lead","ld","reptop"],
    "description":"Leaderboard."
}