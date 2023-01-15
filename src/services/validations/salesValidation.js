const { salesSchema } = require('../../schemas');

function validateSaleList(saleList) {
  const { error } = salesSchema.saleListSchema.validate(saleList);
  if (error) {
    return {
      type: 'UNPROCESSABLE_ENTITY',
      message: error.message,
    };
  }

  return true;
}

module.exports = {
  validateSaleList,
};
