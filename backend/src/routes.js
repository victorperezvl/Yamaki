const express = require ('express');
const router = express.Router();
const controller = require ('./controllers');

router.get('/', controller.server);
router.get('/login', controller.login);

module.exports = router;