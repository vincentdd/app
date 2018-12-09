const  express = require('express');
const  router = express.Router();
var user_controller = require('../controllers/userController');

router.get('/', function(req, res) {
    res.send('hello dd!')
});

router.post('/', user_controller.sign_up);

module.exports = router;
