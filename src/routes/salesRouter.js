const express = require('express');
const { salesController } = require('../controllers');
const { salesMidd } = require('../middlewares');

const router = express.Router();

router.get(
  '/',
  salesController.receiveAll,
);
router.get(
  '/:id',
  salesController.receiveById,
);
router.post(
  '/',
  salesMidd.validateKeys,
  salesController.requestCreation,
);
router.put(
  '/:id',
  salesMidd.validateKeys,
  salesController.requestUpdate,
);
router.delete(
  '/:id',
  salesController.requestDelete,
);

module.exports = router;
