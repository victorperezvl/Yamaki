const express = require('express');
const morgan = require('morgan');
const routes = require('./routes.js');
const path = require('path');

//Initial configuration
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));

// Statics files
app.use(express.static(path.join(__dirname,'../../frontend')));

//Middlewares
app.use(morgan('dev'));

//Routes
app.use('/api', routes);
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname,'../../frontend', 'index.html'))
});


console.log('probando');





