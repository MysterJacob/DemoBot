module.exports.run = function(msg,bot,args){
    console.log("123")
    if(!msg.member.hasPermission("ADMINISTRATOR")){return msg.reply("SIE MÜSSEN ADMINISTRATOR UNSERES DISCORD SERVER SEIN, UM DIES ZU TUN!!!");};
    if(!msg.mentions.users.size){
        return msg.reply("Podaj użytkownika");
    }
    const user = msg.mentions.users.first();
    if(!user.bannable){return msg.reply("That użytkownik can not be zbanowany.");};
    user.ban();
    msg.reply("Zbanowany");
}
module.exports.help = {
    "names":["ban,baaa"],
    "description":"Daje bana użytkownikowi!"
}