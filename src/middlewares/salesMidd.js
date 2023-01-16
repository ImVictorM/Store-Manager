const { salesSchema: { saleRequiredKeys } } = require('../schemas');
const { productsModel } = require('../models');

function validateKeys(req, res, next) {
  const { body: saleList } = req;
  let errorMessage = null;
  const keysAreValid = saleList.every((sale) => {
    const { error = false } = saleRequiredKeys.validate(sale);
    errorMessage = error.message;
    return !error;
  });

  if (!keysAreValid) {
    return res.status(400).json({ message: errorMessage });
  }

  return next();
}

async function validateProductsExist(req, res, next) {
  const { body: saleList } = req;

  const productsExist = await Promise.all(saleList.map(async (sale) => {
    const { productId } = sale;
    const productQuery = await productsModel.findById(productId);
    const productExists = typeof productQuery === 'object';
    return productExists;
  }));
  const invalidRequest = productsExist.some((productExists) => productExists === false);
  if (invalidRequest) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return next();
}

module.exports = {
  validateKeys,
  validateProductsExist,
};
