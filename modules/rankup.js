const ranks = ["765192629033500692","765578893435469835","778604596632223755","778547502110605372","778547502110605372","808096470057222176","778604741856198666","778605795315154974","778604672763691028","778604672763691028","783974185939894313","778608824218419240","745277138734940171","765893609798762527","808670725044174858","808671903225085993","808636830114643968","774294127117729822"]
module.exports.run =()=>{}
module.exports.rankup= (Member)=>{
    for(let i=0;i<ranks.length;i++){
        if(i < ranks.length){
        const roleid = ranks[i]
            if(!Member.roles.cache.has(roleid)){
                
                const rankup = Member.guild.roles.cache.find(r => r.id == roleid); 
                Member.roles.add(rankup)
                return rankup
            }
            
        }
    }
    const rankup = Member.guild.roles.cache.find(r => r.id == ranks[0]); 
    Member.roles.add(rankup)
    return rankup
}
module.exports.rankdown= (Member)=>{
    for(let i=ranks.length-1;i>=0;i--){

        const roleid = ranks[i]
        if(Member.roles.cache.has(roleid)){
            if(i < ranks.length){
                const rankdown = Member.guild.roles.cache.find(r => r.id == roleid); 
                Member.roles.remove(rankdown)
                return rankdown
            }
            
        }
    }
}