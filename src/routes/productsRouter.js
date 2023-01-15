const express = require('express');
const { productsController } = require('../controllers');
const { productsMidd } = require('../middlewares');

const router = express.Router();

router.get('/', productsController.receiveAll);
router.get('/:id', productsController.receiveById);
router.post(
  '/',
  productsMidd.validateKeys,
  productsController.requestCreation,
);

module.exports = router;
