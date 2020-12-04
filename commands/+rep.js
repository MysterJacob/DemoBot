const customUserData = require("../modules/customUserData.js");

module.exports.run = function(msg,bot,args){
    if(!msg.mentions.users.size){
        return msg.reply("Podaj użytkownika");
    }
    const user = msg.mentions.users.first();
    if(user == msg.author){
        return msg.reply("Nie możesz sam dodać sobie repa!");
    }
    const data =customUserData.getUserData(msg.author.id)["usedRep"];
    if(data == undefined || data == false){
        let rep = customUserData.getUserData(user.id).reputation || 0;
        const tag = user.tag;
    
        const repgiv = Math.abs(1/ (rep+2));
        rep = rep + repgiv;
        rep = Math.round(rep*1000)/1000
        msg.reply("Reputacja użytkownika "+user.tag.slice(0,tag.indexOf("#"))+" wynosi teraz:"+rep);
        customUserData.setUserData(user.id,"reputation",rep);
    
        customUserData.setUserData(msg.author.id,"usedRep",true)
        setTimeout(()=>{
            customUserData.setUserData(msg.author.id,"usedRep",false)
        },1000*60*60*24)
    }else{
        msg.reply("Możesz następny raz użyć tej komendy za 24h!")
    }

    
}

module.exports.help = {
    "names":["+rep","+reputation","+rp"],
    "description":"Daje reputacje użytkownikowi."
}