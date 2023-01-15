const { productsSchema } = require('../../schemas');

function productWasFound(product) {
  if (product) {
    return true;
  }
  return {
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
