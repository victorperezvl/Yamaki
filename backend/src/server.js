const express = require ('express');
const morgan = require('morgan');
const routes = require('./routes.js');
const database = require ('./database.js');

//Initial configuration
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));

//Middlewares
app.use(morgan('dev'));

//Routes
app.use(routes);


console.log('probando');





