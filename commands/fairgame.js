const { copyFileSync } = require("fs");
let points = {}
module.exports.run = function(msg,bot,args){
    if(args.length != 1 ){
        msg.reply("I see,\n\r You are new there, here are the rules of the game \n\r Give me a ``number`` and I will pick a number between 0 and the ``number`` \n\r"+
        "There is an exaple ```>>fairgame 1000``` \n\r"+
        "A!, if guess the number, I will give you the ``number`` of points \n\r"+
        "Your goal is to score above the 100000000 points , gl;hf;");
        return
    }
    try{
        const number = Math.round(Math.random()*parseInt(args[0]));
        msg.reply("Now send the number you think, I picked!")
        const filter = m => m.author.id == msg.author.id;
        const collector = msg.channel.createMessageCollector(filter, { time: 15000, max:1});
        collector.on("collect",m => {
            if(points[msg.author.id] == undefined){
                points[msg.author.id] = 0
            }
            if(m.content == number){
                msg.reply("Good, im gimming u poinz")
                points[msg.author.id] += number
 
                msg.reply("You have now "+points[msg.author.id]+" points!")
            }else{
                msg.reply("Not this time!")
                points[msg.author.id] -= number
                msg.reply("You have now "+points[msg.author.id]+" points!")
            }
            if(points[msg.author.id] > 100000000){
                msg.reply("Wait, how....");
                msg.reply("SERVER HAS FLAG HERE");
            }
        })
    }catch(e){
        console.log(e)
        msg.reply("I said number ....")
    }
   
}
module.exports.help = {
    "names":["fg","fairgame"],
    "description":"Plays fairgame with bot."
}