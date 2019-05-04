const  express = require('express');
const  router = express.Router();
const user_controller = require('../controllers/userController');

let responseData;
router.use((req, res, next) => {
    responseData = {
        // 状态码
        code: 0,
        // 返回的消息
        message: ""
    };
    res.locals.responseData = responseData;
    next();
});

router.get('/', function(req, res) {
    res.send('hello dd!')
});

router.post('/', user_controller.sign_up);

module.exports = router;
