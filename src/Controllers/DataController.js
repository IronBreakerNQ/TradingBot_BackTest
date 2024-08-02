class DataController{
    GetData = async (req,res,next) => {
        try{
            
        }catch(error){
            console.log(error);
            next(error);
        }
    }
}

module.exports = new DataController;