const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.receiveAll);
router.get('/:id', productsController.receiveById);

module.exports = router;
