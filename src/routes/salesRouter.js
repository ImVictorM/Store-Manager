const express = require('express');
const { salesController } = require('../controllers');
const { salesMidd } = require('../middlewares');

const router = express.Router();

router.get('/', salesController.receiveAll);
router.get('/:id', salesController.receiveById);
router.post(
  '/',
  salesMidd.validateKeys,
  salesMidd.validateProductsExist,
  salesController.requestCreation,
);

module.exports = router;
