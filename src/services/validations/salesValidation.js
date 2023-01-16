const { salesSchema: { salePattern } } = require('../../schemas');

function validateSaleList(saleList) {
  let errorMessage = null;
  const salesAreValid = saleList.every((sale) => {
    const { error = false } = salePattern.validate(sale);
    errorMessage = error.message;
    return !error;
  });
  if (!salesAreValid) {
    return {
      type: 'UNPROCESSABLE_ENTITY',
      message: errorMessage,
    };
  }

  return true;
}

module.exports = {
  validateSaleList,
};
