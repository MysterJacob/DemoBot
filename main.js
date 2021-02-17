
const discord = require("discord.js");
const fs = require("fs");

const bot = new discord.Client();
const config = JSON.parse(fs.readFileSync("config.json"));
bot.config = config
bot.commands = new discord.Collection();
function loadCommands(){
    fs.readdir(config.commandsLocation,(err,files)=>{
        files.forEach(file=>{
            
            const names = file.split(".");
            const name = names[0];
            console.log("Loading command:" + name);
            const command = require(config.commandsLocation+"/"+name);

            bot.commands.set(command.help.names.toString(),command);
            
        })
        
    })
}
function loadModules(){
    fs.readdir(config.modulesLocation,(err,files)=>{
        files.forEach(file=>{
            const names = file.split(".");
            const name = names[0];
            console.log("Loading module:" + name);
            const module = require(config.modulesLocation+"/"+name);
            module.run(bot,config);
        })
        
    })
}
bot.on("ready",()=>{
    loadCommands();
    loadModules();
    /*
    bot.guilds.cache.get("743481870787936347").members.cache.forEach(async member=>{
       // member.setNickname("User#"+(Math.round(Math.random()*8999)+1000).toString())
        await member.setNickname("Adam Kierowik Salonu")
        await member.send("Adam Kierowik Salonu")
        if(Math.round(Math.random()*10) == 1){
            await member.send("https://static.wikia.nocookie.net/among-us-wiki/images/5/5f/Impostor.png/revision/latest?cb=20200323011708")
        }else{
            //https://i.ytimg.com/vi/GJECg8hMurU/maxresdefault.jpg
            await member.send("https://i.ytimg.com/vi/GJECg8hMurU/maxresdefault.jpg")
        }
    })
    */
})

bot.on("message",(msg)=>{
    if(msg.content.startsWith(config.prefix)){
        
        const userInput = msg.content.slice(config.prefix.length);
        const fullArgs = userInput.split(" ");
        const commandName = fullArgs[0];
        const arg = fullArgs.slice(1);
        const command = bot.commands.find(c=>c.help.names.includes(commandName))
        if(command != null){
            command.run(msg,bot,arg);
        }
    }
    
})


bot.login(config.token)