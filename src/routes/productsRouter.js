const express = require('express');
const { productsController } = require('../controllers');
const { productsMidd } = require('../middlewares');

const router = express.Router();

router.get(
  '/',
  productsController.receiveAll,
);
router.get(
  '/:id',
  productsController.receiveById,
);
router.put(
  '/:id',
  productsMidd.validateReqKeys,
  productsController.requestUpdate,
);
router.post(
  '/',
  productsMidd.validateReqKeys,
  productsController.requestCreation,
);

module.exports = router;
