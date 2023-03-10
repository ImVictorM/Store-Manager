const express = require('express');
const { productsController } = require('../controllers');
const { productsMidd } = require('../middlewares');

const router = express.Router();

router.get(
  '/',
  productsController.receiveAll,
);
router.get(
  '/search',
  productsController.receiveBySearchQuery,
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
router.delete(
  '/:id',
  productsController.requestDelete,
);

module.exports = router;
