module.exports.run = function(bot,config){
    bot.on("message",(msg)=>{
        const channel = msg.channel;
        const author = msg.author;
        if(channel.id == config.channels.linksToClassroom){
            const content = msg.content;
            let link = content;

            if(!link.startsWith("https://meet.google.com/")){
                msg.delete().catch((E)=>{});
                return author.send("To nie jest prawidłowy link. \r\t Prawidłowy link musi się zaczynać od ``https://meet.google.com/``.");
            }
            if(link.length != 36){
                msg.delete().catch((E)=>{});
                author.send("To nie jest prawidłowy link. \r\t Prawidłowy link musi mieć 36 liter.");
                link = link.slice(0,36);
            }

            if(content != link){
                channel.send(link);
                return author.send("Poprawiony link został wysłany na kanał z linkami.");
            }
            
        }
    })
}