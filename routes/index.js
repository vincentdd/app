var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

router.use('/tag', require('./tag'));

module.exports = router;
