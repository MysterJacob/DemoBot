const discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"));
module.exports.run = function(msg,bot,arg){
    const embed = new discord.MessageEmbed();
    embed.setTitle("Pomoc")
    embed.setDescription("Poniżej znajdują się wyjaśnienia \r\n wszystkich kommend.");
    embed.setColor("#cc6821");
    embed.setThumbnail(bot.user.avatarURL());
    bot.commands.forEach(command=>{
        const names = command.help.names.toString();
        embed.addField(config.prefix+names,command.help.description);
    })

    msg.channel.send(embed);
}
module.exports.help ={
    "names":["help","pomoc"],
    "description":"Bottom text"
}