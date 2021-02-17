const crypto = require("crypto");
const fs = require("fs");
module.exports.run = function(msg,bot,args){
    if(args.length != 1){
        const content ="Hey, you need to specify an argument, like this: filename:accesstoken \n\r Here is an exaple ```test:098f6bcd4621d373cade4e832627b4f6```";
        return msg.reply(content);
    }
    console.log(args[0])
    if(!args[0].includes(":")){
        const content ="Hey, you need to specify the accesstoken, like this: filename:accesstoken \n\r  Here is an exaple ```test:098f6bcd4621d373cade4e832627b4f6```";
        return msg.reply(content)
    }
    const filename = args[0].split(":")[0]
    const accesstoken = args[0].split(":")[1]
    const md5 = crypto.createHash("md5")
    md5.update(filename)
    const hash = md5.digest('hex')
    if(!filename.match(/^[0-9a-z]+$/)){
        return msg.channel.send("Only to 0 to 9 and a to z! NO PATH TRAVERSAL.")
    }
    if(accesstoken == hash){
        msg.channel.send("Token valid, reading the file...")
        fs.readFile("./challangeFiles/"+filename+".txt",(err,file)=>{
            if(err){
                err = "ERROR \n\r ```"+err+"```"
                msg.channel.send(err);
            }
            file = "```"+file+"```"
            msg.channel.send(file);
        })

    }else{
        return msg.reply("It seems like you don't have a token you little bastard!")
    }
}
module.exports.help = {
    "names":["rf"],
    "description":"Read a file in very secure way!"
}