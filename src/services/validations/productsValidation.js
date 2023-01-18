const { productsSchema } = require('../../schemas');
const { productsModel } = require('../../models');

async function validateProductExists(id) {
  const product = await productsModel.findById(id);
  if (!product) {
    return {
      type: 'NOT_FOUND',
      message: 'Product not found',
    };
  }
  return false;
}

function validateProductPattern(product) {
  const { error } = productsSchema.productStandard.validate(product);
  if (error) {
    return {
      type: 'UNPROCESSABLE_ENTITY',
      message: error.message,
    };
  }

  return false;
}

module.exports = {
  validateProductExists,
  validateProductPattern,
};
