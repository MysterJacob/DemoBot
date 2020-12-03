const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"))
module.exports.run = function(bot,config){
    fs.readdir(config.modulesLocation,(err,files)=>{

    });
}
module.exports.createUserData = function(userID){
    const filePath = config.userDataLocation + "/"+userID+".json";
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath,"{}");
    }
}

module.exports.getUserData = function(userID){
    const filePath = config.userDataLocation + "/"+userID+".json"; 
    if(!fs.existsSync(filePath)){
        this.createUserData(userID);         
    }
    
    return JSON.parse(fs.readFileSync(filePath));
}

module.exports.setUserData = function(userID,data,value){
    const filePath = config.userDataLocation + "/"+userID+".json";
    if(!fs.existsSync(filePath)){
        this.createUserData(userID);
    }
    const userData = this.getUserData(userID);
    userData[data] = value;
    fs.writeFileSync(filePath,JSON.stringify(userData));
}