const discord = require("discord.js");
const https = require('https');
const { join } = require("path");


module.exports.run = function(msg,bot,arg){
    //https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
    //Dog fact
    https.get('https://some-random-api.ml/facts/cat', (resp) => {
    let data = '';
        resp.on('data', (chunk) => {
        data += chunk;
        });
        resp.on('end', () => {
            const image = JSON.parse(data).fact;
            msg.channel.send(image);
        });
    }).on("error", (err) => {
        msg.reply("Coś poszło nie tak");
    });
    //Random image
    https.get('https://some-random-api.ml/img/cat', (resp) => {
    let data = '';
        resp.on('data', (chunk) => {
        data += chunk;
        });
        resp.on('end', () => {
            const image = JSON.parse(data).link;
            msg.channel.send(image);
        });
    }).on("error", (err) => {
        msg.reply("Coś poszło nie tak");
    });
}
module.exports.help ={
    "names":["kot","cat"],
    "description":"Daje ci zdjęcie kota."
}