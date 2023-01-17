const { productsSchema } = require('../../schemas');

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
  productIsValid,
};
