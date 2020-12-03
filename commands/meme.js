const discord = require("discord.js");
const https = require('https');
const { join } = require("path");


module.exports.run = function(msg,bot,arg){
    
    //https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
    https.get('https://some-random-api.ml/meme', (resp) => {
    let data = '';
  
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        const image = JSON.parse(data).image;
        msg.channel.send(image);
    });
  
    }).on("error", (err) => {
        msg.reply("Coś poszło nie tak");
    });

}
module.exports.help ={
    "names":["mems","meme","memez","mem"],
    "description":"Daje ci mema"
}