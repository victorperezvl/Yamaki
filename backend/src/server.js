const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan');
const routes = require('./routes.js');
const path = require('path');

//Charge env
dotenv.config();

//Initial configuration
const app = express();
app.set('port', process.env.PORT);
app.listen(app.get('port'));

// Statics files
app.use(express.static(path.join(__dirname,'../../frontend')));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api', routes);
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname,'../../frontend', 'index.html'))
});


console.log('server running on port 4000');





