const { productsModel } = require('../models');

function validateReqKeys(req, res, next) {
  const { body: product } = req;
  if (!product.name) {
    return res.status(400).json({
      message: '"name" is required',
    });
  }
  return next();
}

async function productExists(req, res, next) {
  const { params: { id } } = req;
  const productWasFound = await productsModel.findById(id);
  if (!productWasFound) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return next();
}

module.exports = {
  validateReqKeys,
  productExists,
};
