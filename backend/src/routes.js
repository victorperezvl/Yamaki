const express = require ('express');
const router = express.Router();
const controller = require ('./controllers/authController.js');

router.get('/', controller.server);
router.get('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;