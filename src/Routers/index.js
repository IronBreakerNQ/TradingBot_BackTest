const Data = require('./Data/data');
function route(app){
    app.use('/Data',Data);
}

module.exports = route;