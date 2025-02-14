const express = require ('express');
const router = express.Router();
const authController = require ('./controllers/authController.js');
const authHairdresser = require ('./controllers/authHairdressers.js');

//Routes auth users
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

//Routes auth hairdressers
router.post('/hairdresser/login', authHairdresser.login);
router.post('/hairdresser/register', authHairdresser.register);
router.post('/hairdresser/logout', authHairdresser.logout);



module.exports = router;