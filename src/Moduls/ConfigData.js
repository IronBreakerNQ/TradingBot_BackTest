//
const Data = require('../Models/Data');
//moduls
const InputData = require("./InputData");
const Algorithm = require("../Algorithm/Algorithm");


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

                // Tính toán RSI cho các khoảng thời gian khác nhau
                const rsis50 = await Algorithm.RSI(subArray.map(c => c.low), 50);
                const rsis100 = await Algorithm.RSI(subArray.map(c => c.low), 100);
                const rsis200 = await Algorithm.RSI(subArray.map(c => c.low), 200);
                //ema
                const emas50 = await Algorithm.EMA(subArray.map(c => c.low), 50);
                const emas100 = await Algorithm.EMA(subArray.map(c => c.low), 100);
                const emas200 = await Algorithm.EMA(subArray.map(c => c.low), 200);

                for(let i = 0 ; i<subArray.length ; i++){
                    subArray[i].rsi50 = i<50 ? rsis50[0] : rsis50[i-50];
                    subArray[i].rsi100 = i<100 ? rsis100[0] : rsis100[i-100];
                    subArray[i].rsi200 = i<200 ? rsis200[0] : rsis200[i-200];

                    //ema
                    subArray[i].ema50 = i<50 ? emas50[0] : emas50[i-50];
                    subArray[i].ema100 = i<100 ? emas100[0] : emas100[i-100];
                    subArray[i].ema200 = i<200 ? emas200[0] : emas200[i-200];
                }

                const timeStart = subArray[0].timestamp;
                const timeEnd= subArray[719].timestamp;
                const open = subArray[0].open;
                const close = subArray[0].close;

                 const data = await Data.create(
                    {
                        TimeStart:timeStart,
                        TimeEnd:timeEnd,
                        Open:open,
                        Close:close,
                        data:subArray
                    });
            }
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = new ConfigData