module.exports.run = function(msg,bot,args){ 
    msg.reply("Pamiętaj jeżeli przegrasz zostanie zbanowany! Napisz ``TAK``, aby potwierdzić");
    const member = msg.member
    const channel = msg.channel
    //https://discordjs.guide/popular-topics/collectors.html
    const filter = m => m.author.id == msg.author.id;
    const collector = channel.createMessageCollector(filter, { time: 15000, max:1});




    collector.on('collect', m => {
        const content = m.content.toLowerCase()
        if(content == "tak"){
            channel.send(m.author.tag +" *napina rewolwer*")
            setTimeout(()=>{
                const random = Math.random()
                if(Math.floor(random*2) == 1){
                    channel.send("*strzał*")
                    
                    if(Math.floor(random*100)<= 90){
                        const randomrole = member.roles.cache.random()
                        channel.send("Strzał trafił w role "+randomrole.name)
                        member.roles.remove(randomrole)
                    }else{
                        channel.send(m.author.tag +" *nie żyje*")
                        try{
                            msg.member.kick()
                        }catch(error){
                            channel.send("Wygląda na to że nie moge cie zbanować... :thinking: ")
                        }
                    }               
                }else{
                    channel.send("*Tick*")
                    channel.send("*Tym razem przeżyłeś*")
                }
            },1000*4)
        }else{

        }
    });

}
module.exports.help = {
    "names":["rr","russianroulette"],
    "description":"Eliminowanie ludzi bez szcześcia."
}