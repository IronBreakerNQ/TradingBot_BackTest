const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

//db connect
const db = require('./Config/db/index')
db.connect();


const test = require('./Moduls/InputData');
// s


//use routes
const route = require('./Routers');
route(app);


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
