const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"))
module.exports.run = function(bot,config){
    fs.readdir(config.modulesLocation,(err,files)=>{

    });
}
module.exports.createUserData = function(userID){
    const filePath = config.userDataLocation + "/userID.json";
    if(!fs.existsSync(filePath)){
        fs.write(filePath,"{}");
    }
}
module.exports.getUserData = function(userID,data){
    const filePath = config.userDataLocation + "/userID.json";
    if(!fs.existsSync(filePath)){
        createUserData(userID);
    }
    return JSON.parse(fs.readFileSync(filePath));
}
module.exports.setUserData = function(userID,data,value){
    const filePath = config.userDataLocation + "/userID.json";
    if(!fs.existsSync(filePath)){
        createUserData(userID);
    }
    const userData = getUserData(userID,data);
    userData[data] = value;
    fs.writeFile(filePath,JSON.stringify(userData));
}