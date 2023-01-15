const express = require('express');
const { salesController } = require('../controllers');
const { salesMidd } = require('../middlewares');

const router = express.Router();

router.post('/', salesMidd.validateKeys, salesController.requestCreation);

module.exports = router;
