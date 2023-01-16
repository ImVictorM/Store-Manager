const { salesSchema: { salePattern } } = require('../../schemas');

function saleWasFound(saleList) {
  if (saleList.length === 0) {
    return {
      type: 'NOT_FOUND',
      message: 'Sale not found',
    };
  }
  return true;
}

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
  saleWasFound,
};
