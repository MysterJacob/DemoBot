const { default: Collection } = require("@discordjs/collection");
const discord = require("discord.js");
const fs = require("fs");
const bot = new discord.Client();
const config = JSON.parse(fs.readFileSync("config.json"));

bot.commands= new discord.Collection();

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
    bot.channels.cache
})

bot.on("message",(msg)=>{
    if(msg.content.startsWith(config.prefix)){
        const userInput = msg.content.slice(config.prefix.length);
        const fullArgs = userInput.split(" ");
        const commandName = fullArgs[0];
        const arg = fullArgs.slice(1);
        const command = bot.commands.find(n=>n.help.names.indexOf(commandName) != -1);
        if(command != null){
            command.run(msg,bot,arg);
        }
    }
    
})


bot.login(config.token)