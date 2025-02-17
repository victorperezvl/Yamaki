const express = require ('express');
const router = express.Router();
const authController = require ('./controllers/authController.js');
const authHairdresser = require ('./controllers/authHairdressers.js');
const userController = require ('./controllers/userController.js');
const middlewares = require ('./middlewares.js');

//Routes auth users
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

//Routes auth hairdressers
router.post('/hairdresser/login', authHairdresser.login);
router.post('/hairdresser/register', authHairdresser.register);
router.post('/hairdresser/logout', authHairdresser.logout);

//Routes appointments users
router.post('/appointments/logged', middlewares, userController.bookLogged);
router.post('/appointments', userController.bookGuest);
router.post('/appointments/logged/cancel', middlewares, userController.cancelAppointment);
router.get('/appointments/see', middlewares, userController.seeAppointment);



module.exports = router;