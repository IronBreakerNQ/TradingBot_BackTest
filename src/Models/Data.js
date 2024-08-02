const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    TimeDate: {type:Date, },
    Open: { type: Number,},
    High: { type: Number,},
    Low: { type: Number,},
    Close: { type: Number,},
    Volume: { type: Number,},
    RSI:{ type: Number},
    EMA:{ type: Number},
    data: [
        {
            timestamp: { type: Date, required: true },
            open: { type: Number, required: true },
            high: { type: Number, required: true },
            low: { type: Number, required: true },
            close: { type: Number, required: true },
            volume: { type: Number, required: true },
            
            rsi50: { type: Number},
            rsi100: { type: Number},
            rsi200: { type: Number},
            
            ema50:{ type: Number},
            ema100:{ type: Number},
            ema200:{ type: Number},
        }
    ]
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
