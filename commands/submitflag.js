const crypto = require("crypto");
const fs = require("fs")
const flagsConfPath = "./flags.json"
const flagsConfig = JSON.parse(fs.readFileSync(flagsConfPath))
const ranks = ["809039869417750568","784357047986683915","811220167664205844","809766267019460649","811328451608444928","811329333728641034"]
function giveRank(Member){
    
    for(let i=ranks.length;i>0;i--){   
        if(i+1 < ranks.length){
            const roleid = ranks[i+1]         
            if(Member.roles.cache.has(roleid)){
            
            
                const rankup = Member.guild.roles.cache.find(r => r.id == roleid); 
                Member.roles.add(rankup)
                return rankup
            }
            
        }
    }
    const rankup = Member.guild.roles.cache.find(r => r.id == ranks[0]); 
    Member.roles.add(rankup)
    return rankup
}
module.exports.run = function(msg,bot,args){
    if(args.length != 1){
        return msg.reply("Podaj flage!")
    }
    const md5 = crypto.createHash("sha256")
    md5.update(args[0])
    const hash = md5.digest('hex')
    if(flagsConfig.flags.includes(hash)){
        flagsConfig.flags.splice(hash)
        msg.channel.send("You have found a flag! Congrats!");
        const rank = giveRank(msg.member);
        msg.channel.send("You've been given a "+rank.name+" rank!");
    }else{
        msg.channel.send("Wrong flag :p");
    }
    fs.writeFileSync(flagsConfPath,JSON.stringify(flagsConfig))
}
module.exports.help = {
    "names":["submit","sf"],
    "description":"submit."
}