const express = require('express');
const router = express.Router();
const bill_controller = require('../controllers/billController');

//bill
router.get('/', bill_controller.find_all);
router.post('/', bill_controller.add_bill);
router.post('/lists', bill_controller.add_bill_list);

// router.get('/:id', tag_controller.find_by_id);

router.route('/:id')
    .get(bill_controller.find_by_id)
    .put(bill_controller.bill_update);

// router.post('', tag_controller.find_one);
module.exports = router;
