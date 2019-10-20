var express = require('express');
var router = express.Router();
const tag_controller = require('../controllers/tagController');

/* GET home page. */
// router.get('/', function(req, res) {
//   res.redirect('/catalog');
// });

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

router.use('/tags', require('./tags'));
router.use('/bills', require('./bills'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));

module.exports = router;
