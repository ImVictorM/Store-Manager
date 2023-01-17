const { productsSchema } = require('../../schemas');
const { productsModel } = require('../../models');

async function productWasFound(id) {
  const product = await productsModel.findById(id);
  if (product) {
    return true;
  }
  return {
    type: 'NOT_FOUND',
    message: 'Product not found',
  };
}

function productIsValid(product) {
  const { error } = productsSchema.productStandard.validate(product);
  if (error) {
    return {
      type: 'UNPROCESSABLE_ENTITY',
      message: error.message,
    };
  }

  return true;
}

module.exports = {
  productWasFound,
  productIsValid,
};
