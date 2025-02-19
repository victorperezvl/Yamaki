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
router.post('/appointments', authMiddlewares.authenticateUser, userController.bookLogged);
router.post('/appointments/guest', userController.bookGuest);
router.delete('/appointments/:id', authMiddlewares.authenticateUser, userController.cancelAppointment);
router.get('/appointments', authMiddlewares.authenticateUser, userController.seeAppointment);

//Routes appointments hairdressers
router.patch('/hairdresser/appointments', authMiddlewares.authenticateHairdresser, hairdresserController.confirmAppointment);
router.delete('/hairdresser/appointments/:id', authMiddlewares.authenticateHairdresser, hairdresserController.cancelAppointment);
router.get('/hairdresser/appointments/:date', authMiddlewares.authenticateHairdresser, hairdresserController.seeAppointments);
router.get('/hairdresser/appointments/info/:id', authMiddlewares.authenticateHairdresser, hairdresserController.seeInformationUsers);
router.patch('/hairdresser/description', authMiddlewares.authenticateHairdresser, hairdresserController.setDescription);
router.get('/hairdresser/users', authMiddlewares.authenticateHairdresser, hairdresserController.searchUsers);
router.get('/hairdresser/users/:id', authMiddlewares.authenticateHairdresser, hairdresserController.informationRegisteredUsers);
router.patch('/hairdresser/appointments/points', authMiddlewares.authenticateHairdresser, hairdresserController.usePoints);





module.exports = router;