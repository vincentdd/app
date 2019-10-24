const express = require('express');
const router = express.Router();
const bill_controller = require('../controllers/billController');

router.route('/:id')
    .get(bill_controller.find_by_id)
    .put(bill_controller.bill_update);

// router.post('', tag_controller.find_one);
module.exports = router;