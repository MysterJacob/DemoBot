const customUserData = require("../modules/customUserData.js");

module.exports.run = function(msg,bot,args){
    if(!msg.mentions.users.size){
        return msg.reply("Podaj użytkownika");
    }
    const user = msg.mentions.users.first();
    if(user == msg.author){
        return msg.reply("Nie możesz sam dodać sobie repa!");
    }
    let rep = customUserData.getUserData(user.id).reputation || 0;
    const tag = user.tag;

    const now = new Date()
    const lastUse = Date.parse(customUserData.getUserData(msg.author.id)["lastRepUse"]) || Date.parse("Tue Oct 14 2005 16:51:21 GMT+0100 (GMT+01:00)")

    //https://stackoverflow.com/questions/7709803/javascript-get-minutes-between-two-dates
    const diffMs = -1 * (lastUse - now); // milliseconds between now & Christmas
    const diffDays =Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays >= 1){
        const repgiv = Math.abs(1/ (rep+2));
        rep = rep + repgiv;
        rep = Math.round(rep*1000)/1000
        msg.reply("Reputacja użytkownika "+user.tag.slice(0,tag.indexOf("#"))+" wynosi teraz:"+rep);
        customUserData.setUserData(user.id,"reputation",rep);
        customUserData.setUserData(msg.author.id,"lastRepUse",now.toString())
    }else{
        const minutesToUse = 59 - diffMins
        const hoursToUse = 23 - diffHrs
        msg.reply("Możesz użyć tej komendy dopiero za "+hoursToUse.toString()+" godzin i "+minutesToUse.toString()+" minut :clock1: .")
    }


    
}

module.exports.help = {
    "names":["+rep","+reputation","+rp"],
    "description":"Daje reputacje użytkownikowi."
}