const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.receiveAll);
router.get('/:id', productsController.receiveById);
router.post('/', productsController.requestCreation);

module.exports = router;
