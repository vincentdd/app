const  express = require('express');
const  router = express.Router();
const tag_controller = require('../controllers/tagController');

router.get('/', function(req, res) {
    res.send('tag manage!')
});

router.post('/', );

module.exports = router;
