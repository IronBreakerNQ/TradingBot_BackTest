class Algorithm {
    // Hàm tính trung bình cộng
    calculateAverage = (values, period) => {
        let sum = values.reduce((acc, val) => acc + val, 0);
        return sum / period;
    }

    // Hàm tính RSI
    RSI = (arr, period) => {
        const gains = [];
        const losses = [];

        // Tính toán các mức tăng và giảm
        for (let i = 1; i < arr.length; i++) {
            let change = arr[i] - arr[i - 1];
            if (change >= 0) {
                gains.push(change); // Thêm vào mảng gains nếu tăng
                losses.push(0); // Thêm vào mảng losses nếu không giảm
            } else {
                gains.push(0); // Thêm vào mảng gains nếu không tăng
                losses.push(Math.abs(change)); // Thêm vào mảng losses nếu giảm
            }
        }

        // Tính trung bình cộng của gains và losses trong khoảng thời gian đầu tiên
        let avgGain = this.calculateAverage(gains.slice(0, period), period);
        let avgLoss = this.calculateAverage(losses.slice(0, period), period);

        const rsis = [];

        let currentAvgGain = avgGain;
        let currentAvgLoss = avgLoss;

        // Tính toán RSI cho mỗi giá trị tiếp theo
        for (let i = period; i < arr.length; i++) {
            if (i === period) {
                let rs = avgLoss === 0 ? 100 : avgGain / avgLoss; // Xử lý trường hợp avgLoss bằng 0
                let rsi = 100 - (100 / (1 + rs));
                rsis.push(Math.floor(rsi)); // Thêm RSI đầu tiên vào mảng rsis
            } else {
                let gain = gains[i - 1];
                let loss = losses[i - 1];

                currentAvgGain = ((currentAvgGain * (period - 1)) + gain) / period; // Cập nhật trung bình gains
                currentAvgLoss = ((currentAvgLoss * (period - 1)) + loss) / period; // Cập nhật trung bình losses

                let rs = currentAvgGain / currentAvgLoss;
                let rsi = 100 - (100 / (1 + rs));
                rsis.push(Math.floor(rsi)); // Thêm RSI vào mảng rsis
            }
        }

        return rsis; // Trả về mảng RSI
    }

    EMA = (arr, N) => {
        const alpha  = 2 / (N + 1);
        let ema = [];

        let sma = arr.slice(0,N).reduce((acc,val) => acc + val, 0) / N;
        ema.push(sma);

        for( let i = N ; i < arr.length ; i++){
            sma = alpha * (arr[i] - sma) + sma;
            ema.push(sma);
        }

        return ema;
    }
}

module.exports = new Algorithm();
