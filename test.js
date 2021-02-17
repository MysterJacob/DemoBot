const myMoney = 1500
const shop =[
    {"prize":1500,"name":"bagno","buy-function":()=>{console.log("Kupiłeś")}},
    {"prize":500,"name":"bagno2","buy-function":()=>{console.log("Kupiłeś bagno, dobra inwestycja")}}
]
function buy(index){
    const item = shop[index]
    const prize = item["prize"]
    if(prize > myMoney){
        console.log("Nie mas money!")
    }else{
        item["buy-function"]();
    }
}
buy(1)