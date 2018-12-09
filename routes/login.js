const express = require('express');
//const fs = require('fs');
const router = express.Router();
var user_controller = require('../controllers/userController');

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('./public/login.html');
});

router.post('/', user_controller.sign_up);

module.exports = router;
