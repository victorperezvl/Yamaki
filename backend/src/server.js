const express = require('express');
const morgan = require('morgan');
const routes = require('./routes.js');
const path = require('path');

//Initial configuration
const app = express();
app.set('port', process.env.PORT);
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


console.log('server running on port 4000');





