const Data = require('../Models/Data');
// moduls
const InputData = require('../Moduls/InputData');
const ConfigData = require('../Moduls/ConfigData');

class DataController{
    //[POST] data/create
    GetData = async (req,res,next) => {
        try{
            await ConfigData.create();
            res.json("Input Done");
        }catch(error){
            console.log(error);
            next(error);
        }
    }
}

module.exports = new DataController;