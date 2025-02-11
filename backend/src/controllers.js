const controller = {};
const db = require ('./database.js');

controller.server  = (req, res)=>{

    res.send('YAMAKI')

};

controller.login = (req, res)=>{

    res.send('PANEL PARA EL LOGIN')

}

module.exports = controller;