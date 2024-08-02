class Algorithm{
    calculateAverage = async(values,period) =>{
        let sum = values.reduce((acc, val) => acc + val, 0);
        return sum / period;    
    }

    RSI = async (arr) => {
        const gains = [];
        const lost = [];

        let n = 14;

        for(let i = 1; i<arr.length;i++){
            let change = arr[i]-arr[i-1];
            if(change >= 0 ){
                gains.push(change);
                lost.push(0);
            }else{
                gains.push(0);
                lost.push(change);
            }
        }

        const avgGain = this.calculateAverage(gains.slice(0 , n), n);
        const avgLost = this.calculateAverage(lost.slice(0 , n), n);

        const rsis = [];

        let currentAvgGain = avgGain;
        let currentAvgLosses = avgLosses;

        for(let i = n ; i < arr.length ; i++){
            if(i === n){
                let rs;
                if(avgLost === 0 ){
                    rs = 100;
                }else{
                    rs = avgGain / avgLost;
                }
                let rsi = 100 - (100 / (1 + rs));

                Math.floor(rsi);

                rsis.push(
                    Math.floor(rsi)
                );

            }else{
                let gain = gains[i - 1];
                let loss = lost[i - 1];

                currentAvgGain = ((currentAvgGain * (n - 1)) + gain) / n;
                currentAvgLosses = ((currentAvgLosses * (n - 1)) + loss) / n;

                let rs = currentAvgGain / currentAvgLosses;
                let rsi = 100 - (100 / (1 + rs));

                Math.floor(rsi);
                rsis.push(  
                     Math.floor(rsi)
                );
            }
        }

        return rsis;
    }
    EMA = async () => {

    }
}

module.exports = Algorithm;