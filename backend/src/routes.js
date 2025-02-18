const express = require ('express');
const router = express.Router();
const authController = require ('./controllers/authController.js');
const authHairdresser = require ('./controllers/authHairdressers.js');
const userController = require ('./controllers/userController.js');
const authMiddlewares = require ('./middlewares.js');
const hairdresserController = require ('./controllers/hairdresserController.js');

//Routes auth users
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

//Routes auth hairdressers
router.post('/hairdresser/login', authHairdresser.login);
router.post('/hairdresser/register', authHairdresser.register);
router.post('/hairdresser/logout', authHairdresser.logout);

//Routes appointments users
router.post('/appointments/logged', authMiddlewares.authenticateUser, userController.bookLogged);
router.post('/appointments', userController.bookGuest);
router.post('/appointments/logged/cancel', authMiddlewares.authenticateUser, userController.cancelAppointment);
router.get('/appointments/see', authMiddlewares.authenticateUser, userController.seeAppointment);

//Routes appointments hairdressers
router.post('/hairdresser/confirm', authMiddlewares.authenticateHairdresser, hairdresserController.confirmAppointment);
router.post('/hairdresser/cancel', authMiddlewares.authenticateHairdresser, hairdresserController.cancelAppointment);
router.post('/hairdresser/seeAppointments', authMiddlewares.authenticateHairdresser, hairdresserController.seeAppointments);

module.exports = router;