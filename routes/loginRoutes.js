var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/users/login', controllers.loginController.getLogin);

router.post('/users/login', controllers.loginController.actionLogin);

router.get('/users/register', controllers.loginController.getRegister);

module.exports = router;
