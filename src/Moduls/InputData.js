//lib 
const ccxt = require('ccxt');


class InputData{
    constructor() {}

    GetScripData = async(since,endSince) => {
        try {
            const binance = new ccxt.binance();
            var arr = [];                          
            while(true){
                const ohlcv = await binance.fetchOHLCV('BTC/USDT', '1m', since, 720);
                const formattedData = ohlcv.map(candle => {
                    return {
                        timestamp: new Date(candle[0]).toISOString(),
                        open: candle[1],
                        high: candle[2],
                        low: candle[3],
                        close: candle[4],
                        volume: candle[5]
                    };
                });
    
                if(ohlcv.length % 720 ===0){
                    console.log(ohlcv.length);
                    arr.push(ohlcv);
                }


                since = ohlcv[ohlcv.length - 1][0] + 60000;
                 console.log('Updated since:', new Date(since).toISOString(),'endSince:', new Date(endSince).toISOString());
                // Stop if we reach current time
                if (since >= endSince) break;
            }
          
        return arr;

    
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    }

    InputAM = async () => {
        try {
            let now = Date.now();        
            let nowDate = new Date(now);

            let yesterdayMidnight = new Date(nowDate);

            yesterdayMidnight.setDate(nowDate.getDate() - 1);
            yesterdayMidnight.setUTCHours(0, 0, 0, 0);


            yesterdayMidnight=yesterdayMidnight.getTime();



            const oneDayInMillis = 24 * 60 * 60 * 1000;
    
            const since = [];
            for (let i = 3; i <= 30; i += 3) {
                 let yesterdayMidnight1=yesterdayMidnight-(i*oneDayInMillis)
                 since.push(yesterdayMidnight1);
            }
    
            const [
                data1, data2, data3,
                data4, data5, data6,
                data7, data8, data9,
                data10
            ] = await Promise.all([
                this.GetScripData(since[0], yesterdayMidnight),
                this.GetScripData(since[1], since[0]),
                this.GetScripData(since[2], since[1]),
                this.GetScripData(since[3], since[2]),
                this.GetScripData(since[4], since[3]),
                this.GetScripData(since[5], since[4]),
                this.GetScripData(since[6], since[5]),
                this.GetScripData(since[7], since[6]),
                this.GetScripData(since[8], since[7]),
                this.GetScripData(since[9], since[8])
            ]);
    
            const mergedData = [
                ...data1.reverse(), ...data2.reverse(), ...data3.reverse(), ...data4.reverse(), ...data5.reverse(),
                ...data6.reverse(), ...data7.reverse(), ...data8.reverse(), ...data9.reverse(), ...data10
            ];
    
            console.log(mergedData.length);
            return mergedData; 
        } catch (error) {
            console.error("Error merging data:", error);
        }
    };
    

    InputTM = async () => {
        try {
            let now = Date.now();        
            let nowDate = new Date(now);

            let yesterdayMidnight = new Date(nowDate);

            yesterdayMidnight.setDate(nowDate.getDate() - 1);
            yesterdayMidnight.setUTCHours(0, 0, 0, 0);


            yesterdayMidnight=yesterdayMidnight.getTime();



            const oneDayInMillis = 24 * 60 * 60 * 1000;
    
            const since = [];
            for (let i = 18; i <= 90; i += 18) {
                 let yesterdayMidnight1=yesterdayMidnight-(i*oneDayInMillis)
                 since.push(yesterdayMidnight1);
            }
    
            const [
                data1, data2, data3,
                data4, data5
            ] = await Promise.all([
                this.GetScripData(since[0], yesterdayMidnight),
                this.GetScripData(since[1], since[0]),
                this.GetScripData(since[2], since[1]),
                this.GetScripData(since[3], since[2]),
                this.GetScripData(since[4], since[3])
            ]);
    
            const mergedData = [
                ...data1.reverse(), ...data2.reverse(), ...data3.reverse(), ...data4.reverse(), ...data5.reverse()
            ];
    
            console.log(mergedData.length);
            return mergedData; 
        } catch (error) {
            console.error("Error merging data:", error);
        }
    };
    



    InputSM = async()=>{

        try{
            let now = Date.now();        
            let nowDate = new Date(now);

            let yesterdayMidnight = new Date(nowDate);

            yesterdayMidnight.setDate(nowDate.getDate() - 1);
            yesterdayMidnight.setUTCHours(0, 0, 0, 0);


            yesterdayMidnight=yesterdayMidnight.getTime();



            const oneDayInMillis = 24 * 60 * 60 * 1000;

        const since = [];

        for(let i = 36 ; i <= 180 ; i += 36){
            let yesterdayMidnight1=yesterdayMidnight-(i*oneDayInMillis)
            since.push(yesterdayMidnight1);
        }

        const [
            data1, data2, data3,
            data4, data5

        ] = await Promise.all([
            this.GetScripData(since[0], yesterdayMidnight),
            this.GetScripData(since[1], since[0]),
            this.GetScripData(since[2], since[1]),
            this.GetScripData(since[3], since[2]),
            this.GetScripData(since[4], since[3]),
        ]);

         
        const mergedData = [
            ...data1.reverse(), ...data2.reverse(), ...data3.reverse(), ...data4.reverse(), ...data5.reverse()
        ];

        console.log(mergedData.length);
        return mergedData; 
        }catch(error){
            console.error("Error merging data:", error);
        }

    }
}

module.exports = new InputData;