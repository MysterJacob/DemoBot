const { Collection } = require("discord.js");
const fs = require("fs")
const discord = require("discord.js")
const customUserData = require("../modules/customUserData.js");
module.exports.run = function(msg,bot,args){
    const guild = msg.guild
    fs.readdir(bot.config.userDataLocation,(err,files)=>{
        let leaderboard = new Collection()
        let reputations = []
        files.forEach(file=>{
            const name = file.split(".")[0]
            const userData = customUserData.getUserData(name)
            if (userData["reputation"] != undefined){
                leaderboard.set(userData["reputation"],name)
                reputations.push(userData["reputation"])
            }
        })
        const embed = new discord.MessageEmbed()
        const sorted = reputations.sort().reverse()
        
        embed.setTitle("Tabela reputacji")
        embed.setColor("#fcba03")
        let index = 1
        sorted.forEach(su=>{

            const userID = leaderboard.get(su)
            const user =  msg.guild.members.cache.find(m=>m.id == userID)
            console.log(user)
            embed.addField(index+". "+user.user.tag,su)
            index+=1
        })
        msg.channel.send(embed)
    });
   
}
module.exports.help = {
    "names":["lead","ld","reptop"],
    "description":"Leaderboard."
}