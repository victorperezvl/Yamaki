const express = require ("express");
const morgan = require("morgan");
const database = require ("./database.js")

//Initial configuration
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));

//Middlewares
app.use(morgan("dev"));


//Routes
app.get('/', (req, res) => {

    res.send('EN DESARROLLO...');
    
});

console.log('probando');





