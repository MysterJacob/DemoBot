const { Message } = require("discord.js");
const customUserData = require("../modules/customUserData.js");

module.exports.run = function(msg,bot,args){
    let user = msg.author;
    if(msg.mentions.users.size > 0){
        user = msg.mentions.users.first();
    }
   
    let rep = customUserData.getUserData(user.id).reputation || 0;
    const tag = user.tag;
    msg.reply("Reputacja użytkownika "+user.tag.slice(0,tag.indexOf("#"))+" jest równa "+rep);
    customUserData.setUserData(user.id,"reputation",rep);
}
module.exports.help = {
    "names":["rep","reputation","rp"],
    "description":"Sprawdza reputacje użytkownika"
}