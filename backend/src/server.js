const express = require ("express");

const app = express();
app.set('port', 4000);
app.listen(app.get('port'));


app.get('/', (req, res) => {

    res.send('prueba nodemon');
    

});

console.log('nodemon instalado correctamente');
console.log('segunda prueba');
console.log('tercer log');



