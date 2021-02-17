const cron = require("cron");
module.exports.run = async function(bot,config){
    const job1 = new cron.CronJob('00 37 21 * * *', ()=>{
        //Papajus.dll
        const channel = await bot.channels.cache.find(ch=>ch.id == config.channels.papajus)
        if(channel){
            channel.send("2137");
        }
    }); 
}