//
const Data = require('../Models/Data');
//moduls
const InputData = require("./InputData");


class ConfigData{
    async create(){
        try{
            let inputData = await InputData.InputAM();
            for(let subArray of inputData){
                subArray = subArray.map( candle => {
                    return{
                        timestamp: new Date(candle[0]).toISOString(),
                        open: candle[1],
                        high: candle[2],
                        low: candle[3],
                        close: candle[4],
                        volume: candle[5]
                    }
                })
                const data = await Data.create({data:subArray});
            }
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new ConfigData