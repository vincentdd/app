var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

router.use('/tags', require('./tags'));
router.use('/bills', require('./bills'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/catalog', require('./catalog'));

module.exports = router;
