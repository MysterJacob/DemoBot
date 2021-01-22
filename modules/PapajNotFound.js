module.exports.run = async function(bot,config){
    
    setInterval(async ()=>{
        const date = new Date()
        
        try{
            
            if(date.getHours() == 21 && date.getMinutes() == 41){
                console.log(date.getHours())
                console.log(date.getMinutes())
                //Papajus.dll
                const channel = await bot.channels.cache.find(ch=>ch.id == config.channels.papajus)
                if(channel){
                    channel.send("2137");
                }
                
            }
        }catch(exp){
            console.log(exp)
        }
        
    }
    ,1000*59)
}